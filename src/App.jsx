
// App component is a functional React component that serves as the root component of the React application. 
import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Sidebar/Main/Main'

const App = () => {
    return(
        <>
          <Sidebar/>
          <Main/>
        </>
    )
}

export default App