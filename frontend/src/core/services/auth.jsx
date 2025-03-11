import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const getAuthToken = () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (!token) {
        return null
    }

    const durationToken = getTokenDuration()
    if (durationToken <= 0) {
        return 'TOKEN_EXPIRED'
    }

    return token
}

const logoutAction = () => {
    localStorage.clear()

    toast('Come back soon!')
    return redirect('/')
}

const getUserId = () => {
    const userId = localStorage.getItem('USER_ID')

    if (!userId) {
        return null
    }

    return JSON.parse(userId)
}

const getUserRoles = () => {
    const roles = JSON.parse(localStorage.getItem('USER_ROLES'))

    if (!roles) {
        return []
    }

    return roles
}

const getUserType = () => {
    const userType = localStorage.getItem('USER_TYPE')

    if (!userType) {
        return null
    }

    return JSON.parse(userType)
}

const getTokenDuration = () => {
    const storedExpirationTime = localStorage.getItem(
        'AUTH_TOKEN_EXPIRATION_TIME'
    )
    const expirationTime = new Date(storedExpirationTime)
    const now = new Date()

    const duration = expirationTime.getTime() - now.getTime()
    return duration
}

const storeTokenAndExpiration = (token, expirationTime) => {
    localStorage.setItem('AUTH_TOKEN', token)
    localStorage.setItem('AUTH_TOKEN_EXPIRATION_TIME', expirationTime)
}

const checkAuthLoader = () => {
    const token = getAuthToken()

    if (!token) {
        return redirect('/')
    }
    return token
}

const createProtectedLoader = (allowedRoles, allowedUserType, loader) => {
    const token = getAuthToken()
    const userRoles = getUserRoles()
    const userType = getUserType()

    const isAllowedRoles = allowedRoles.some((role) => userRoles.includes(role))
    const isAllowedType = allowedUserType === userType

    if (!token || !isAllowedRoles || !isAllowedType) {
        return redirect('/')
    }

    return loader()
}

// Loader that it's gonna execute allways that de root component it's re-evaluated.
// So, we can handle every other component that needs to be updated by the token.
const tokenRootLoader = () => {
    const token = getAuthToken()
    const userId = getUserId()
    const roles = getUserRoles()
    const userType = getUserType()

    return {
        token,
        userId,
        roles,
        userType,
    }
}

export {
    getAuthToken,
    logoutAction,
    storeTokenAndExpiration,
    tokenRootLoader,
    checkAuthLoader,
    getTokenDuration,
    getUserId,
    getUserRoles,
    getUserType,
    createProtectedLoader,
}
