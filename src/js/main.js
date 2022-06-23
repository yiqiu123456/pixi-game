import { Container } from 'pixi.js'
import * as config from './config'
import Application from './app'
import Loading from './loading'
import VideoAd from './ad'
import Scene from './scene'
import swal from 'sweetalert'

const layers = {
  back: new Container(),
  scene: new Container(),
  ui: new Container()
}

async function boot() {
  document.title = config.meta.name

  window.app = new Application({
    width: config.meta.width,
    height: config.meta.height,
    view: document.querySelector('#scene'),
    transparent: true
  })

  // for (const key in layers) {
  //   let layer = layers[key]
  //   app.stage.addChild(layer)
  //   layer.x = config.meta.width / 2
  //   layer.y = config.meta.height / 2
  // }
}

function loadRes() {
  let promise = new Promise((resolve, reject) => {
    let loading = new Loading()
    layers.ui.addChild(loading)

    app.on('loader:progress', progress => loading.progress = progress)
    app.on('loader:error', error => reject(error))
    app.on('loader:complete', () => {
      resolve()
      loading.destroy()
    })
    app.load()
  })
  return promise
}

function setup() {
  let scene = new Scene()
  app.stage.addChild(scene)
  // layers.scene.addChild(scene)
  scene.start()
}

window.onload = async () => {
  //启动application
  boot()

  //加载资源，出错的话就显示错误提示
  try {
    await loadRes()
  } catch (error) {
    console.log(error)
    let reload = await swal({
      title: 'load resource failed',
      text: error,
      icon: 'error',
      button: 'reload'
    })
    if (reload) {
      location.reload(true)
    }
    return
  }

  //加载成功后显示游戏界面
  setup()
}