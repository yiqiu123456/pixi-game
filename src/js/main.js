import * as PIXI from 'pixi.js'
import '../css/main.css'
import birdImage from '../assets/image/birdniaodongwukatong.png'

const app = new PIXI.Application({
  width: 720,
  height: 600,
  backgroundColor: 0x1099bb,
  view: document.querySelector("#scene")
})
const texture = PIXI.Texture.from(birdImage)
// const texture = PIXI.utils.TextureCache['../assets/image/birdniaodongwukatong.png']
const bird = new PIXI.Sprite(texture)
bird.x = 260
bird.y = 260
app.stage.addChild(bird)
app.ticker.add((delta) => {
  bird.rotation -= 0.01 * delta
})