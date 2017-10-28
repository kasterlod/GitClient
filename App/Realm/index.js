import Realm from 'realm'
import {
    Structure,
    Settings,
    Files,
} from './Schemas'

const realm = new Realm({schema: [Settings, Files, Structure], schemaVersion: 14 })

export const ImmutableRealm = (func, option = {}) => {
    const defaultCopy = (item) => JSON.parse(JSON.stringify(item))
    const copy = option.copy || defaultCopy
    const success = option.success || true
    const fail = option.fail || false
    const defualtErrorHandler = (e) => e
    const errorHandler = option.errorHandler || defualtErrorHandler
    
    return (props) => new Promise((resolve, reject) => {
      try {
        const result = func(props, realm) || null
        const copiedResult = copy(result)
        resolve({ status: success, data: copiedResult })
      } catch (e) {
        const error = errorHandler(e)
        reject({ status: fail, error })
      }
    })
  }
