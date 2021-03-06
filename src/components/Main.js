import React, { Component } from 'react'
import Shifts from './Shifts'
import SignUpForm from './SignUpForm'
import NewShiftForm from './NewShiftForm'
import SignInForm from './SignInForm'
import { Switch, Route } from 'react-router-dom'

export default class Main extends Component {

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/shifts' component={Shifts}/>
          <Route exact path='/' component={SignInForm}/>
          <Route exact path='/shifts/new' component={NewShiftForm}/>
          <Route exact path='/sign_up' component={SignUpForm}/>
        </Switch>
      </main>
    )
  }
}
