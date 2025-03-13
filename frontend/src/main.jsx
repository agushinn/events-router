import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@css/index.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
        <Analytics />
        <SpeedInsights />
    </>
)
