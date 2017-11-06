'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const authapi = require('./authapi')
const authui = require('./authui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.signUp(data)
    .then(authui.signUpSuccess)
    .then(authapi.signUpSignIn)
    .then(authui.signInSuccess)
    .catch(authui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.signIn(data)
    .then(authui.signInSuccess)
    .catch(authui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  authapi.changePassword(data)
    .then(authui.changePasswordSuccess)
    .catch(authui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  authapi.signOut()
    .then(authui.signOutSuccess)
    .catch(authui.signOutFailure)
}

const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-link').on('click', onSignOut)
}

module.exports = {
  addAuthHandlers
}
