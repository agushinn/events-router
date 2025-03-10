import { toast } from 'react-toastify'

import { getAuthToken } from '@services/auth'

import { API_URL } from '@constants/configs'

const controlMailsAction = async ({ request }) => {
    const token = getAuthToken()
    const method = request.method || 'POST'
    let route = method === 'POST' ? 'send' : 'unsubscribe'

    // get form data
    const formData = await request.formData()
    const checkedEmails = {
        emails: formData.getAll('newsletterEmail'),
    }

    const response = await fetch(`${API_URL}newsletters/${route}`, {
        method: method,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(checkedEmails),
    })

    const data = await response.json()
    if (!data.success) {
        return toast(data.message, {
            toastId: data.message,
        })
    }
    return toast(data.message)
}

const controlNewAdminAction = async ({ request }) => {
    const token = getAuthToken()
    const method = request.method || 'POST'

    // get form data
    const formData = await request.formData()
    const newAdmin = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    // create new admin
    const response = await fetch(`${API_URL}auth/admin`, {
        method: method,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAdmin),
        credentials: 'include',
    })

    const data = await response.json()
    if (!data.success) {
        return toast(data.message, {
            toastId: data.message,
        })
    }
    return toast(data.message)
}

const setCredentialsAction = async ({ request }) => {
    const token = getAuthToken()
    const formData = await request.formData()
    const credentials = { credentials: formData.get('credentials') }

    const response = await fetch(`${API_URL}emails/set-credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
    })
    const responseData = await response.json()

    if (!responseData.success) {
        return toast(responseData.message)
    }

    return toast('Credentials set!')
}

const loader = async () => {
    const token = getAuthToken()
    const response = await fetch(`${API_URL}newsletters`, {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    })

    const data = await response.json()

    if (!data.success) {
        throw new Response(
            JSON.stringify({
                message: data.message || 'Could not fetch emails.',
            }),
            { status: data.status }
        )
    }

    return { newsletters: data.data }
}

export {
    controlMailsAction,
    controlNewAdminAction,
    setCredentialsAction,
    loader,
}
