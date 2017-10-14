import {ImmutableRealm} from '../Realm'

export const getRealmSettings = ImmutableRealm((props, realm) => {
    const settings = realm.objectForPrimaryKey('Settings', 0)
    const offlineAvailableFiles = realm.objects('File').filtered(`version == ${settings ? settings.currentVersion : 0}`).length
    if (!settings) {
        realm.write(() => realm.create('Settings', {}))
    }
    return {
        ...settings,
        totalFiles: 0,
        offlineAvailableFiles,
    }
})