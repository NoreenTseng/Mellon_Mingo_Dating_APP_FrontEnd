import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd-mobile'
import enUS from 'antd-mobile/es/locales/en-US'
import { AuthProvider } from './components/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes.js'
import { WebSocketProvider } from './components/WebSocketContext.jsx'
import NotificationAlertWrapper from './components/NotificationAlertWrapper.js'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ConfigProvider prefixCls="ant" locale={enUS}>
        <Router>
            <AuthProvider>
                <WebSocketProvider>
                    <div className="text-lg">
                        <NotificationAlertWrapper />

                        <AppRoutes />
                    </div>
                </WebSocketProvider>
            </AuthProvider>
        </Router>
    </ConfigProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
