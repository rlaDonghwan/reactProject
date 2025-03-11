import React from 'react'
import logo from './logo.svg'
import './App.css'

import P from './P'

export default function App() {
  const texts = ['hello', 'world'].map((text, index) => (
    <P key={index} children={text} />
  ))
  return <div children={texts} />
}

// export default function App() {
//   const texts = [<p key="1">hello</p>, <p key="2">world</p>]
//   return <div>{texts}</div>
// }
