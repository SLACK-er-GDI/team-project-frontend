'use strict'

const store = require('../store')

const signUpSuccess = (data) => {
  console.log('success')
  $('#sign-up-form').modal('hide')
  $('#sign-in-form').modal('show')
  $('#sign-up-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const signUpFailure = () => {
  $('#sign-up-message').text('ERROR: Email in use or you fat-fingered the password')
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
