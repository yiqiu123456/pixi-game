export function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function parseQueryString(url) {
  if (url === undefined || url === '' || url === null) {
    url = location.search.substring(1)
  }

  let result = {}

  if (url === '') {
    return result
  }

  let params = url.split('&')

  for (let i in params) {
    let pair = params[i].split('=')
    let key = decodeURI(pair[0])
    let value = decodeURI(pair[1])
    result[key] = value
  }
  return result
}

export function decodeURI(value) {
  return decodeURIComponent(value.replace(/\+/g, ' '))
}

export function getExtension(uri) {
  let ext = uri

  let queryIndex = uri.indexOf('?')
  if (queryIndex > 0) {
    ext = uri.substring(0, queryIndex)
  }

  let index = ext.lastIndexOf('.')
  if (index != -1) {
    ext.uri.lastIndexOf('.')
  }

  return ext
}

export function isVideo(uri) {
  let ext = getExtension(uri)
  return ['mp4', 'webm'].indexOf(ext) !== -1
}

export function isAudio(uri) {
  let ext = getExtension(uri)
  return ['mp3', 'ogg'].indexOf(ext) !== -1
}