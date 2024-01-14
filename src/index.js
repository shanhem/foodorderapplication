import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { StateProvider } from './context/StateProvider'
import { initialState } from './context/initialState'
import  Reducer  from "./context/Reducer";


ReactDOM.render(
    <Router>
        <StateProvider initialState={initialState} Reducer={Reducer }>
    <App/>
    </StateProvider>
    </Router>,document.getElementById('root')
    );