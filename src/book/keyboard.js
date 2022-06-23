// 键盘事件管理类
class KeyBoard {
  constructor(_window, value) {
    // 按建值
    this.value = value
    this._window = _window
    this.isDown = false
    this.isUp = true
    this.press = undefined
    this.replease = undefined
    // 注册事件
    this._window.addEventListener("keydown", this.downHandler, false)
    this._window.addEventListener("keyup", this.upHandler, false)
  }

  downHandler(event) {
    if (event.key === this.value) {
      if (this.isUp && this.press) this.press()
      this.isDown = true
      this.isUp = false
      event.preventDefault()
    }
  }

  upHandler(event) {
    if (event.key === this.value) {
      if (this.isdoen && this.replease) this.replease()
      this.isUp = true
      this.isDown = false
      event.preventDefault()
    }
  }

  removeEventListener(name, handler) {
    this._window.removeEventListener(name, handler)
  }

  unsubscribe() {
    this.removeEventListener('keydown', this.downHandler)
    this.removeEventListener('keyup', this.upHandler)
  }

  pressEvent(pressHandler) {
    this.press = pressHandler
  }

  repleaseEvent(repleaseEvent) {
    this.replease = repleaseEvent
  }
}