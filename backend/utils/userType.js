const USER_ROLES = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    CONTROL_PANEL: 'CONTROL_PANEL',
}

const USER_TYPES = {
    REGULAR: {
        name: 'REGULAR',
        roles: [
            USER_ROLES.CREATE,
            USER_ROLES.READ,
            USER_ROLES.UPDATE,
            USER_ROLES.DELETE,
        ],
    },
    ADMIN: {
        name: 'ADMIN',
        roles: [
            USER_ROLES.CREATE,
            USER_ROLES.READ,
            USER_ROLES.UPDATE,
            USER_ROLES.DELETE,
            USER_ROLES.CONTROL_PANEL,
        ],
    },
}

module.exports = { USER_ROLES, USER_TYPES }
