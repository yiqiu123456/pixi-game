export const width = 796

//height of the canvas
export const height = 1280

//game name
export const name = 'yiqiu'

//game version
export const version = '1.0.0'

//游戏基本信息，游戏名字，版本，宽，高等。
export const meta = {
  name: 'yiqiu puzzle',
  version: '1.0.0',
  width: 796,
  height: 1280
}

//多国语言，根据浏览器语言自动加载相应的语言包资源。
export const i18n = {
  'en': 'assets/i18n/en.json',
  'zh-cn': 'assets/i18n/zh-cn.json'
}

//游戏视口显示区域，不写的话全屏显示。
export const viewRect = null

export const resource = [
  {
    name: 'main',
    url: 'assets/image/main.json'
  },
  {
    name: 'sound_bg',
    url: 'assets/audio/win.mp3'
  },
  {
    name: 'sound_win',
    url: 'assets/audio/win.mp3'
  },
  {
    name: 'sound_fail',
    url: 'assets/audio/fail.mp3'
  },
  {
    name: 'bg',
    i18n: {
      'en': 'assets/image/bg_en.png',
      'zh-ch': 'assets/image/bg_zh-cn.png'
    }
  }
]
