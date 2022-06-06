import sound from 'pixi-sound'

export default class Sound {
  setVolume(volume) {
    sound.volumeAll = Math.max(0, Math.min(1, parseFloat(volume)))
  }

  play(name, loop) {
    if (typeof loop != 'boolean') {
      loop = false
    }
    let sound = app.res[name].sound
    sound.loop = loop
    return sound.play()
  }

  stop(name) {
    app.res[name].sound.stop()
  }

  toggleMuteAll() {
    sound.toggleMuteAll()
  }
}