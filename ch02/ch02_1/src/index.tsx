import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

//물리 DOM에 직접 렌더링
let pPhysicalDOM = document.createElement('p')
pPhysicalDOM.innerText = 'Hello physical DOM world!'
document.body.appendChild(pPhysicalDOM)

//가상 DOM에 렌더링
// let pVirtualDOM = React.createElement('p', null, 'Hello, React!')
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(pVirtualDOM)

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
