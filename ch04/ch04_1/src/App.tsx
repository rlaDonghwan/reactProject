import UseOrCreateTest from './pages/UseOrCreateTest'
import Memo from './pages/Memo'
import Callback from './pages/Callback'
import HighOrderCallback from './pages/HighOrderCallback'

export default function App() {
  return (
    <div>
      <UseOrCreateTest />
      <Memo />
      <Callback />
      <HighOrderCallback />
    </div>
  )
}

// import Clock from './pages/Clock'
// import { useClock } from './hooks'
// import { useEffect, useState } from 'react'

// export default function App() {
//   const today = useClock()
//   return <Clock today={today} />
// }

// export default function App() {
//   const [today, setToday] = useState(new Date())

//   useEffect(() => {
//     const duration = 1000
//     const id = setInterval(() => {
//       setToday(new Date())
//     }, duration)
//     return () => clearInterval(id)
//   }, [])

//   return <Clock today={today} />
// }
