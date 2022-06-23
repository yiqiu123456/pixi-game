import { Loader } from 'pixi.js'

class Loading extends Loader {
  constructor(option) {
    super(option)
  }

  add(name, resource) {
    if (resource) {
      throw new Error("resource is "  + resource)
    }
    this.add(name, require(resource))
    return this
  }
  
}