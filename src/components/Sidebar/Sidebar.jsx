// sidebar.jsx is  a functional React component
// import: keyword in JavaScript used to bring in functionality from other files/modules into the current file. It's used here to import something from the 'react' module.
// React: React object is the core library. It provides the functionality to create and manage React components
// from 'react': specifies where we're importing the React object from. In this case, it's from the 'react' module, which is typically installed via npm (Node Package Manager) when setting up a React project.
// useState hook from the 'react' module. The useState hook is used to add state to functional components.
import React, {useContext, useState} from 'react'

// Importing the CSS file directly into the sidebar.jsx component file allows you to associate component-specific styles with the sidebar component.
import './Sidebar.css'

// It imports assets from an assets module and uses them within the JSX structure to render content.
// "../" attempts to retrieve desired file from a higher directory //'../../assets/assets': goes thru 2 directories to retrieve asset folder
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'
// state is a piece of info that can change overtime across renders in react
// 

// Function component 
const Sidebar = () => {
    // state variable 
    // contains two variables [stateVariable, updatesVariable] are set to false // 
    const [extended, setExtended] = useState(false)
    const {onSent, prevPrompts,setRecentPrompt} = useContext(Context)


    return(
        // represents the root element of the sidebar component
        <div className='sidebar'>
            <div className='top'>
                {/* In React, curly braces {} are used to embed JavaScript expressions within JSX. */}
                {/* The alt attribute provides alternative text for the image which is displayed if the image cannot be loaded*/}
                {/* onClick setExtended should be updated from prev to !prev i.e from extended being false and displaying null to extended being true and displaying equivalent true variable based on conditions set in ternary operations */}
                <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt=""/>
                <div className="new-chat">
                    <img src={assets.plus_icon} alt=""/>
                    {/* since extended was set to false it should display nothing. this will act as prev in the onClick function */}
                    {extended ? <p>New chat</p> : null}
                </div>
                {extended ? 
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompts.map((item,index)=>{
                        return(
                            <div className="recent-entry">
                                <img src={assets.message_icon} alt=""/>
                                <p>{item}...</p>
                            </div>
                        )
                    })}
                    
                </div>
                 : 
                 null}
                
            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt=""/>
                    {extended ? <p>Help</p>: null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt=""/>
                    {extended ? <p>Activity</p>: null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt=""/>
                    {extended ? <p>Settings</p>: null}
                </div>
            </div>              
        </div>  
    )
}

export default Sidebar

// class myComponent extends React.Component{
//     render(){
//         return(
//             <div>
//                 {/* JSX code goes in here */}
//             </div>
//         )
//     }
// }

// import {useState} from 'react';

// interface DemoProps {}

// export default function Demo({}: DemoProps){
//     const [count, setCount] = useState(0);
//     return(
//         <div className='tutorial'>
//             <h1>Count: {count}</h1>
//             <button onClick={()=>setCount(count-1)}>
//                 Decrement
//             </button>
//             <button onClick={()=>setCount(count+1)}>
//                 Increment
//             </button>
//         </div>
//     );
// }