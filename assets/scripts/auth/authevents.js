'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const authapi = require('./authapi')
const authui = require('./authui')

const onSignInFormShow = function (event) {
  event.preventDefault()
  $('#sign-up-form').hide()
}

const onSignUpFormShow = function (event) {
  event.preventDefault()
  $('#sign-in-form').hide()
}

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

const addAuthHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-link').on('click', onSignOut)
  $('#sign-in-form').on('focus', onSignInFormShow)
  $('#sign-up-form').on('focus', onSignUpFormShow)
  $('#sign-up-form').trigger('reset')
  authui.initializeForm()
  $('.close-modal').on('click', function () {
    $('#change-password').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#sign-up').trigger('reset')
  })
  $('.close-modal').on('click', function () {
    $('#sign-in').trigger('reset')
  })
}

module.exports = {
  addAuthHandlers
}
