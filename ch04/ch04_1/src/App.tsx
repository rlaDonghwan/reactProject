import Clock from './pages/Clock'
import { useEffect, useState } from 'react'

export default function App() {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const duration = 1000
    const id = setInterval(() => {
      setToday(new Date())
    }, duration)
    return () => clearInterval(id)
  }, [])

  return <Clock today={today} />
}
