import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

import { API_URL } from '@constants/configs'
import { storeTokenAndExpiration } from '@services/auth'

const action = async ({ request, params }) => {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode') || 'login'

    // get form data
    const data = await request.formData()
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    }

    const response = await fetch(`${API_URL}auth/${mode}`, {
        method: request.method || 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
        credentials: 'include',
    })

    const responseData = await response.json()

    if (!responseData.success) {
        throw new Response(JSON.stringify({ errors: responseData.data }), {
            status: 400,
        })
    }

    const userId = responseData.data.id
    localStorage.setItem('USER_ID', JSON.stringify(userId))
    const roles = responseData.data.roles
    localStorage.setItem('USER_ROLES', JSON.stringify(roles))
    const userType = responseData.data.userType
    localStorage.setItem('USER_TYPE', JSON.stringify(userType))

    // get token
    const token = responseData.data.token

    // calculate expiration token
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 1)

    // save token and expiration
    storeTokenAndExpiration(token, expiration.toISOString())

    // finally redirect
    toast('Welcome!')
    return redirect('/')
}

export { action }
