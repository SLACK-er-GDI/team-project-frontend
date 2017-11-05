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

const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addAuthHandlers
}