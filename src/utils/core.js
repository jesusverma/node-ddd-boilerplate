const { v4: UUIDV4 } = require('uuid')

class CoreUtil {
  constructor() {
    throw new Error(`Can not create an object of ${this.constructor.name}`)
  }

  static clone(object) {
    if (typeof object === 'object') return JSON.parse(JSON.stringify(object))
    else return object
  }

  static V4UUID(withoutHyphens) {
    let uuid = UUIDV4()

    if (withoutHyphens) uuid = uuid.replace(/-/g, '')

    return uuid
  }

  static randomFTEID(entity) {
    return `${entity}-${this.V4UUID()}`
  }

  static displayID(fteid) {
    return fteid.split('-')[1]
  }

  static get V4UUIDRegExp() {
    return '[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'
  }
}

CoreUtil.GUID = CoreUtil.randomGUID = CoreUtil.UUID = CoreUtil.randomUUID =
  CoreUtil.V4UUID

CoreUtil.V4GUIDRegExp = CoreUtil.V4UUIDRegExp

module.exports = CoreUtil
