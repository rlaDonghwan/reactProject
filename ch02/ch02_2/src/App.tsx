// App.tsx
import { Component } from 'react'
import ClassComponent from './ClassComponet'
import exp from 'constants'

export default function App() {
  return (
    <ul>
      <ClassComponent href="http://www.google.com" text="go to Google" />
      <ClassComponent href="https://twitter.com" text="go to Twitter" />
    </ul>
  )
}

// const App = () => {
//   return <h1>function Component</h1>
// }

// export default App

// export default function App() {
//   return <h1>class Component</h1>
// }

// export default class App extends Component {
//   render() {
//     return <h1>class Component</h1>
//   }
// }

// export default class App extends Component {
//   render() {
//     return (
//       <ul>
//         <ClassComponent href="http://www.google.com" text="go to Google" />
//         <ClassComponent href="https://twitter.com" text="go to Twitter" />
//       </ul>
//     )
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
