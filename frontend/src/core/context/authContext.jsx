// import React, { useState } from 'react'

// const AuthContext = React.createContext({
//     id: null,
//     token: null,
//     userRole: [],
//     setUserId: (id) => {},
//     setAuthToken: (token) => {},
//     setUserRoles: (roles) => {},
//     setTokenDuration: () => {},
// })

// export const AuthContextProvider = ({ children }) => {
//     const [id, setId] = useState(null)
//     const [token, setToken] = useState(null)
//     const [userRole, setUserRole] = useState([])
//     const [expirationTime, setExpirationTime] = useState(null)

//     const setUserId = (id) => {
//         setId(id)
//     }

//     const setUserRoles = (roles) => {
//         setUserRole(roles)
//     }

//     const setTokenDuration = () => {
//         const expiration = new Date()
//         expiration.setHours(expiration.getHours() + 1)
//         setExpirationTime(expiration.toISOString())
//     }

//     const getTokenDuration = () => {
//         const storedExpirationTime = new Date(expirationTime)
//         const now = new Date()

//         const duration = storedExpirationTime.getTime() - now.getTime()

//         return duration
//     }

//     const setAuthToken = (token) => {
//         setToken(token)
//     }

//     const getAuthToken = () => {
//         if (!token) {
//             return null
//         }

//         const duration = getTokenDuration()
//         if (duration <= 0) {
//             return 'TOKEN_EXPIRED'
//         }

//         return token
//     }

//     return (
//         <AuthContext.Provider
//             value={{
//                 id,
//                 token,
//                 userRole,
//                 setUserId,
//                 setAuthToken,
//                 getAuthToken,
//                 setUserRoles,
//                 setTokenDuration,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext
