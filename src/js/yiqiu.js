import { Texture, Container, Rectangle } from 'pixi.js'
import Piece from './piece'

//piece之间的空隙
const GAP_SIZE = 2

// 步数等于难度
const COUNT = 10

// 游戏进行中
const BEGINING = 1

// 游戏成功
const SUCCESS = 2

// 游戏失败
const FAIL = 3

//拼图类，控制拼图逻辑，计算块位置，检查游戏是否结束。
export default class Yiqiu extends Container {
  //level难度，比如level=3，则拼图切分成3*3=9块，可尝试换成更大的值调高难度。
  //texture 拼图用的大图
  constructor(level, texture) {
    super()
    this.level = level
    this.texture = texture

    this.gameStatus = BEGINING
    //移动步数
    this.moveCount = 0

    this.$pieces = new Container()
    this.$pieces.x = -4
    this.$pieces.y = 208
    this.addChild(this.$pieces)

    this.$select = new Container()
    this.$select.x = -4
    this.$select.y = 208
    this.addChild(this.$select)

    this._createPieces()
  }

  _shuffle() {
    let index = -1
    let length = this.level * this.level
    const lastIndex = length - 1
    const result = Array.from({
      length
    }, (v, i) => i)
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result
  }

  _createPieces() {

    this.piece_width = this.texture.orig.width / this.level
    this.piece_height = this.texture.orig.height / this.level

    let offset_x = this.texture.orig.width / 2
    let offset_y = this.texture.orig.height / 2

    let shuffled_index = this._shuffle()

    for (let ii = 0; ii < shuffled_index.length; ii++) {

      //pick a piece from the big texture indicated by suffled indexes.
      let frame_row = parseInt(shuffled_index[ii] / this.level)
      let frame_col = shuffled_index[ii] % this.level
      let frame = new Rectangle(frame_col * this.piece_width, frame_row * this.piece_height, this.piece_width, this.piece_height)
      let piece = new Piece(new Texture(this.texture, frame), ii, shuffled_index[ii])


      //add the piece to ui
      let row = parseInt(ii / this.level)
      let col = ii % this.level
      piece.x = col * this.piece_width - offset_x + GAP_SIZE * col
      piece.y = row * this.piece_height - offset_y + GAP_SIZE * row

      piece
        .on('dragstart', (picked) => {
          //put the selected（drag and move） piece on top of the others pieces.
          this.$pieces.removeChild(picked)
          this.$select.addChild(picked)
        })
        .on('dragmove', (picked) => {
          //check if hover on the other piece
          this._checkHover(picked)
        })
        .on('dragend', (picked) => {

          //restore the piece layer
          this.$select.removeChild(picked)
          this.$pieces.addChild(picked)

          //check if can swap the piece
          let target = this._checkHover(picked)
          if (target) {
            this.moveCount++
            this._swap(picked, target)
            target.tint = 0xFFFFFF
          } else {
            picked.x = picked.origin_x
            picked.y = picked.origin_y
          }
        })
      this.$pieces.addChild(piece)
    }
  }

  _swap(picked, target) {
    let pickedIndex = picked.currentIndex
    picked.x = target.x
    picked.y = target.y
    picked.currentIndex = target.currentIndex

    target.x = picked.origin_x
    target.y = picked.origin_y
    target.currentIndex = pickedIndex
  }

  get success() {
    let success = this.$pieces.children.every(piece => piece.currentIndex == piece.targetIndex)
    if (success) {
      return SUCCESS
    } else if(this.moveCount < (this.level * COUNT + 20)) {
      return BEGINING
    } else {
      return FAIL
    }
  }

  _checkHover(picked) {
    let overlap = this.$pieces.children.find(piece => {
      let rect = new Rectangle(piece.x, picked.y, piece.width, piece.height)
      return rect.contains(picked.center.x, picked.center.y)
    })

    this.$pieces.children.forEach(piece => piece.tint = 0xFFFFFF)

    if (overlap) {
      overlap.tint = 0x00ffff
    }

    return overlap
  }
}