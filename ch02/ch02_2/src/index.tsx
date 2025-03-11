import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const rootVirtualDOM = // JSX 문법을 사용하여 Virtual DOM을 생성
  (
    <ul>
      <li>
        <a href="https://www.naver.com">네이버</a>
        <p>네이버 홈페이지</p>
      </li>
    </ul>
  )

const children = [
  <li>
    <a href="https://www.google.com">구글</a>
  </li>,
  <li>
    <a href="https://www.daum.net">다음</a>
  </li>,
  <li>
    <a href="https://www.naver.com">네이버</a>
  </li>,
]

const rootVirtualDOM2 = <ul>{children}</ul> // JSX 문법을 사용하여 Virtual DOM을 생성

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// root.render(rootVirtualDOM2)
root.render(<App />)

reportWebVitals()
