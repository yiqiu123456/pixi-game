import * as PIXI from 'pixi.js'
import Sound from './sound'
import I18n from './i18n'
import * as config from './config'
import { throttle } from 'throttle-debounce'
import { apply } from 'file-loader'

export default class Application extends PIXI.Application {

  // @param {jsonobject} options 和 PIXI.Application 构造函数需要的参数是一样的
  constructor(options) {

    //禁用 PIXI ResizePlugin功能，防止pixi自动自适应.
    //pixi的自适应会修改canvas.width和canvas.height导致显示错误,没法铺满宽或者高。
    options.resizeTo = undefined
    super(options)
    PIXI.utils.EventEmitter.call(this)

    //canvas显示区域，如果设置了viewRect就显示在viewRect矩形内，没设置的话全屏显示。
    this.viewRect = config.viewRect

    //防止调用过快发生抖动，throttle一下
    window.addEventListener('resize', throttle(300, () => {
      this.autoResize(this.viewRect)
    }))
    window.addEventListener('orientationchange', throttle(300, () => {
      this.autoResize(this.viewRect)
    }))

    //自适应
    this.autoResize(this.viewRect)

    //挂载模块
    this.sound = new Sound()
    this.i18n = new I18n(config.i18n)

  }

  //自适应cavas大小和位置，按比例铺满宽或者高。
  autoResize() {
    let viewRect = Object.assign({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }, this.viewRect)

    //游戏宽高比
    const defaultRatio = this.view.width / this.view.height

    //视口宽高比
    const windowRatio = viewRect.width / viewRect.height

    let width, height

    //这里判断根据宽适配还是高适配
    if (windowRatio < defaultRatio) {
      width = viewRect.width
      height = viewRect.width / defaultRatio
    } else {
      height = viewRect.height
      width = viewRect.height * defaultRatio
    }

    //居中显示canvas
    //让canvas显示在中心，高铺满的话，两边留黑边，宽铺满的话，上下留黑边
    let x = viewRect.x + (viewRect.width - width) / 2
    let y = viewRect.y + (viewRect.height - height) / 2

    //自适应
    let autofitItems = document.querySelectorAll('.autofit')
    autofitItems.forEach(item => {
      //设置canvas(autofit)的宽高，注意这里千万不要直接设置canvas.width和height。
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${width}`
      item.style.height = `${height}`
    })
  }

  load(baseUrl) {
    let loader = new PIXI.Loader(baseUrl)
    //为了解决cdn缓存不更新问题，这里获取资源时候加个版本bust
    loader.defaultQueryString = `v=${config.meta.version}`
    //加载当前语言的配置文件
    loader.add(this.i18n.file)
    //加载所有游戏资源
    config.resource.forEach(res => {
      if(res.i18n) {
        loader.add({
          name: res.name,
          url: res.i18n[this.i18n.language]
        })
      } else {
        loader.add(res)
      }
    })
    loader.load((loader, res) => {
      console.log('loader:completed')
      apply.res = res
      this.i18n.add(res[this.i18n.file].data)
      delete res[this.i18n.file]
      this.res = res
      this.emit('loader:complete', res)
    })
    return loader
  }

}

Object.assign(Application.prototype, PIXI.utils.EventEmitter.prototype)