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
        id: 'int',
        name: 'string',
        type: 'string',
        version: 'int',
        data: 'string',
    }
}