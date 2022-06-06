import {TextStyle,Container,Sprite,Text} from 'pixi.js'
import yiqiu from './yiqiu'
import Result from './result'
import Yiqiu from './yiqiu'

const STYLE_WHITE = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 46,
  fontWeight: 'bold',
  fill: '#ffffff',
})

const TOTAL_TIME = 30

let _countdown = TOTAL_TIME

export default class Scene extends Container {
  constructor() {
    super()

    let bg = new Sprite(app.res.bg.texture)
    bg.anchor.set(0.5)
    this.addChild(bg)

    let idol = new Sprite(app.res.main.texture.puzzle)
    idol.y = -198
    idol.x = -165
    idol.anchor.set(0.5)
    idol.scale.set(0.37)
    this.addChild(idol)

    this.$time = new Text(_countdown, STYLE_WHITE)
    this.$time.anchor.set(0.5)
    this.$time.x = 170
    this.$time.y = -156
    this.addChild(this.$time)

    this.$yiqiu = new Yiqiu(3, app.res.main.texture.puzzle)
    this.addChild(this.$yiqiu)
  }

  start() {
    let result = new Result()
    this.addChild(result)

    app.sound.play('sound_bg', true)

    let timer = setInterval( () => {
      if(this.yiqiu.success) {
        clearInterval(timer)
        app.sound.stop('sound_bg')
        app.sound.play('sound_win')
        result.win()
      } else {
        this.$time.text = _countdown + '″'
        if( _countdown == 0) {
          clearInterval(timer)
          app.sound.stop('sound_bg')
          app.sound.play('sound_fail')
          result.fail()
        }
      }
    }, 1000)
  }
}