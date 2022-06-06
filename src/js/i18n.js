import { parseQueryString } from './util'
import mustache from 'mustache'

export default class I18n {
  constructor(i18n_config) {
    this.config = i18n_config
    this.words = {}
  }

  add(words) {
    Object.assign(this.words, words)
  }

  get language() {
    let lang = parseQueryString().lang
    let languages = Object.keys(this.config)
    if (lang && languages.indexOf(lang) != -1) {
      return lang
    }
    lang = window.navigator.userLanguage || window.navigator.language
    if (lang && languages.indexOf(lang) !== -1) {
      return lang
    }
    return 'en'
  }

  get file() {
    let url = this.config[this.language]
    return url
  }

  get(key, options) {
    let text = this.words[key]
    if (text) {
      if (options) {
        return mustache.render(text, options)
      }
      return text
    } else {
      console.warn('can not find key:' + key)
      return ''
    }
  }
}