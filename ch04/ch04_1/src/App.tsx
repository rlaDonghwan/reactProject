import ResponsiveContextTest from './pages/ResponsiveContextTest'
import { ResponsiveProvider } from './contexts'

export default function App() {
  return (
    <ResponsiveProvider>
      <main>
        <ResponsiveContextTest />
      </main>
    </ResponsiveProvider>
  )
}

// import ClickTest from './pages/ClickTest'
// import FileDrop from './pages/FileDrop'
// import InputFocusTest from './pages/InputFocusTest'
// import InputValueTest from './pages/InputValueTest'
// import ForwardRefTest from './pages/ForwardRefTest'
// import ValidatableInputTest from './pages/ValidatableInputTest'

// export default function App() {
//   return (
//     <div>
//       <ValidatableInputTest />
//       <ForwardRefTest />
//       <InputValueTest />
//       <InputFocusTest />
//       <FileDrop />
//       <ClickTest />
//     </div>
//   )
// }

// import ClassLifecycle from './pages/ClassLifecycle'
// import WindowResizeTest from './pages/WindowResizeTest'
// import FetchTest from './pages/FetchTest'

// export default function App() {
//   return (
//     <div>
//       <ClassLifecycle />
//       <WindowResizeTest />
//       <FetchTest />
//     </div>
//   )
// }

// import NumberState from './pages/NumberState'
// import InputTest from './pages/InputTest'
// import ShowHideModal from './pages/ShowHideModal'
// import RadioInputTest from './pages/RadioInputTest'
// import HigherOrderRadioInputTest from './pages/HigherOrderRadioInputTest'
// import BasicForm from './pages/BasicForm'
// import ObjectState from './pages/ObjectState'
// import ArrayState from './pages/ArrayState'

// export default function App() {
//   return (
//     <div>
//       <main>
//         <ArrayState />

//         <NumberState />
//         <InputTest />
//         <ShowHideModal />
//         <RadioInputTest />
//         <HigherOrderRadioInputTest />
//         <BasicForm />
//         <ObjectState />
//       </main>
//     </div>
//   )
// }

// import UseOrCreateTest from './pages/UseOrCreateTest'
// import Memo from './pages/Memo'
// import Callback from './pages/Callback'
// import HighOrderCallback from './pages/HighOrderCallback'

// export default function App() {
//   return (
//     <div>
//       <UseOrCreateTest />
//       <Memo />
//       <Callback />
//       <HighOrderCallback />
//     </div>
//   )
// }

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
