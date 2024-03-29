import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Register from './pages/Register'
import Logon from './pages/Logon'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/incidents/new" exact component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}