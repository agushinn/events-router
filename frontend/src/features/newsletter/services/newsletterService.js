import { API_URL } from '@constants/configs'

const newsletterAction = async ({ request }) => {
    const { method } = request
    const formData = await request.formData()
    const eventFormData = {
        email: formData.get('email'),
    }

    if (!eventFormData.email) {
        return { message: 'Put your email!' }
    }

    const response = await fetch(`${API_URL}newsletters`, {
        method: method,
        body: JSON.stringify(eventFormData),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const responseData = await response.json()

    if (!responseData.success) {
        return { message: responseData.message || 'Could not subscribe email.' }
    }

    return { message: responseData.message }
}

export { newsletterAction }
