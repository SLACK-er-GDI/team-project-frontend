'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const authapi = require('./authapi')
const authui = require('./authui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.signUp(data)
    .then(authui.signUpSuccess)
    .catch(authui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.signIn(data)
    .then(authui.signInSuccess)
    .catch(authui.signInFailure)
}

const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)  
}

module.exports = {
  addAuthHandlers
}