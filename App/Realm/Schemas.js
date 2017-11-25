export const Settings = {
    name: 'Settings',
    primaryKey: 'id',
    properties: {
        id: {
            type: 'int',
            default: 0
        },
        storeOlderFiles: {
            type: 'bool',
            default: true
        },
        currentVersion: {
            type: 'int',
            default: 0
        },
        currentVersionDate: {
            type: 'string',
            default: new Date().toDateString()
        }
    }
}

export const Files = {
    name: 'File',
    primaryKey: 'id',
    properties: {
        id: 'string',
        key: 'int',
        name: 'string',
        type: 'string',
        parent: 'int',
        size: 'int',
        uri: {
            type: 'string',
            default: '',
        },
        modified: 'string',
        isAvailable: {
            type: 'bool',
            default: false,
        },
    }
}

export const Structure = {
    name: 'Structure',
    primaryKey: 'version',
    properties: {
        version: 'int',
        data: {
            type: 'list',
            objectType: 'File',
        },
    }
}