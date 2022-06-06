import {
  utils,
  Container,
  Graphics
} from 'pixi.js'
import Loading from './loading'
import * as config from './config'
import { apply } from 'file-loader'

export default class VideoAd extends Container {
  constructor() {
    super()
    utils.EventEmitter.call(this)

    this.bg = new Graphics()
    this.bg.moveTo(0, 0)
    this.bg.beginFill(0x000000, 0.8)
    this.bg.drawRect(-config.width / 2, -config.height / 2, config.width, config.height)
    this.bg.interactive = true
    this.addChild(this.bg)

    this.startButton = new Graphics()
      .beginFill(0x0, 0.5)
      .drawRoundedRect(0, 0, 100, 100, 10)
      .endFill()
      .beginFill(0xffffff)
      .moveTo(36, 30)
      .lineTo(36, 70)
      .lineTo(70, 50)

    this.startButton.x = -this.startButton.width / 2
    this.startButton.y = -this.startButton.height / 2

    this.startButton.interactive = true
    this.startButton.buttonMode = true

    this.addChild(this.startButton)
    this.startButton.on('pointertap', () => {
      this.displayObjectUpdateTransform()
    })
  }

  play() {
    this.startButton.visible = false
    this.bg.visible = false
    let loading = new Loading({
      process: false
    })

    this.addChild(loading)

    let video = document.createElement('video')
    video.src = 'assets/video/ad.mp4'
    video.className = 'autofit'

    video.onloadeddata = () => {
      loading.destroy()
      video.currentTime = 0
      app.view.parentElement.append(video)
      app.autoResize()
    }

    video.onended = () => {
      video.remove()
      this.emit('over')
      this.destroy(true)
    }

    video.load()
    video.play()
  }
}

Object.assign(VideoAd.prototype, utils.EventEmitter.prototype)