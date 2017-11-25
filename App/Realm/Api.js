import {ImmutableRealm} from '../Realm'

const getUUID = () => Math
  .random()
  .toString(36)
  .substring(2) + (new Date())
  .getTime()
  .toString(36)

export const getRealmSettings = ImmutableRealm((props, realm) => {
  const settings = realm.objectForPrimaryKey('Settings', 0)
  const currentStructure = settings
    ? realm.objectForPrimaryKey('Structure', settings.currentVersion)
    : null
  const files = currentStructure
    ? currentStructure.data
    : null
  const totalElements = files
    ? files.length
    : 0
  const totalFiles = files
    ? totalElements - files
      .filtered(`type == 'directory'`)
      .length
    : 0
  const offlineAvailableFiles = files
    ? files
      .filtered(`isAvailable == true`)
      .length
    : 0
  if (!settings) {
    realm.write(() => realm.create('Settings', {}))
  }
  return {
    ...settings,
    totalFiles,
    totalElements,
    offlineAvailableFiles
  }
})

export const saveRealmSettings = ImmutableRealm((props, realm) => {
  const {newestVersion, newestVersionDate, newestVersionTotalElements} = props
  const settings = realm.objectForPrimaryKey('Settings', 0)
  realm.write(() => {
    settings.currentVersionDate = newestVersionDate
    settings.currentVersion = newestVersion
    settings.totalElements = newestVersionTotalElements
  })
  return true
})

export const saveStructure = ImmutableRealm((props, realm) => {
  try {
    const {version, data} = props
    realm.write(() => {
      const files = []
      data.forEach((file) => {
        const savedFile = realm.create('File', {
          ...file,
          id: getUUID()
        })
        files.push(savedFile)
      })
      realm.create('Structure', {version, data: files})
    })
  } catch (error) {
    console.log(error)
  }
  return true
})

export const getInitialLocation = ImmutableRealm((props, realm) => {
  try {
    const settings = realm.objectForPrimaryKey('Settings', 0)
    const currentStructure = realm.objectForPrimaryKey('Structure', settings.currentVersion)
    return currentStructure.data
  } catch (err) {
    console.log(err)
  }
})