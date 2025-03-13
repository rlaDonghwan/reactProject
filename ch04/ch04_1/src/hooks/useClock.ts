import { useState } from 'react'
import { useInterval } from './useInterval'

export const useClock = () => {
  const [time, setTime] = useState(new Date())

  useInterval(() => setTime(new Date()))
  return time
}
