import { Loader } from '@components/Loader/Loader'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@css/Toastify.css'

import { routes } from '@routes/routes'

const router = createBrowserRouter(routes)

function App() {
    return (
        <>
            <RouterProvider router={router} fallbackElement={<Loader />} />

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
                transition={Slide}
            />
        </>
    )
}

export default App
