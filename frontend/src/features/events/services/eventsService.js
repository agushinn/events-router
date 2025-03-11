import { redirect } from 'react-router-dom'

import { toast } from 'react-toastify'

import { API_URL } from '@constants/configs'
import { getAuthToken, getUserId } from '@services/auth'

const handlerEventAction = async ({ request, params }) => {
    const { method } = request
    const formData = await request.formData()
    const token = getAuthToken()
    const userId = getUserId()

    const eventFormData = {
        title: formData.get('title'),
        image: formData.get('image'),
        date: formData.get('date'),
        description: formData.get('description'),
        author_id: userId,
    }

    let url = `${API_URL}events`

    if (method === 'PATCH') {
        url = `${API_URL}events/${params.eventId}`
    }

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(eventFormData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const responseData = await response.json()

    if (!responseData.success) {
        toast(responseData.message)
        return responseData.data
    }

    // everything ok, notify and redirect
    toast(responseData.message)
    return redirect('/events')
}

const eventDetailLoader = async ({ params }) => {
    const { eventId } = params

    const response = await fetch(`${API_URL}events/${eventId}`)

    const data = await response.json()

    if (!data.success) {
        throw new Response(
            JSON.stringify({
                message:
                    data.message ||
                    `Could not fetch details for selected event.`,
            }),
            {
                status: 500,
            }
        )
    }

    return { event: data.data }
}

const eventDeleteAction = async ({ request, params }) => {
    // method that comes from the submittion in @events/components/EventItem.jsx
    const { method } = request
    const { eventId } = params
    const token = getAuthToken()

    const response = await fetch(`${API_URL}events/${eventId}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    })

    const data = await response.json()

    if (!data.success) {
        throw new Response(
            JSON.stringify({
                message: data.message || 'Could not delete event',
            }),
            {
                status: 500,
            }
        )
    }

    toast('Event deleted succefully')
    return redirect('/events')
}

const myEventsLoader = async ({ params }) => {
    const { userId } = params
    // /users-events
    const response = await fetch(`${API_URL}events/users/${userId}`)
    const data = await response.json()

    if (!data.success) {
        throw new Response(
            JSON.stringify({
                message: data.message || 'Could not fetch events.',
            }),
            { status: 500 }
        )
    }

    return { events: data.data }
}

const loadEvents = async () => {
    const response = await fetch(`${API_URL}events`)
    const data = await response.json()

    if (!data.success) {
        throw new Response(
            JSON.stringify({
                message: data.message || 'Could not fetch events.',
            }),
            { status: 500 }
        )
    }

    return { events: data.data }
}

// const loadPosts = async () => {
//     const response = await fetch('http://localhost:8081/posts')
//     // ...
// }
// const loadUsers = async () => {
//     const response = await fetch('http://localhost:8081/users')
//     // ...
// }

const eventsLoader = ({ params }) => {
    // const { userId } = params.user
    return loadEvents()
    //  defer({
    // Promises to defer
    // events: loadEvents(),
    // posts: loadPosts(),
    // users: loadUser(userId),
    // })
}

export {
    handlerEventAction,
    eventDetailLoader,
    eventDeleteAction,
    myEventsLoader,
    eventsLoader,
}
