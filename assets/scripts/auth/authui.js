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

const signInSuccess = (response) => {
  $('#sign-in-message').text('Sign In to Post Ads')
  $('#sign-in-email').removeData()
  $('#sign-in-password').val('')
  $('#sign-in-form').modal('hide')
  $('#sign-in-link').hide()
  $('#sign-out').show()
  $('#sign-up-nav').hide()
  $('#change-password-link').show()
  $('#create-ads-link').show()
  $('#manage-ads-link').show()
  // Used to clear out login data
  $('#sign-in-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  store.user = response.user
}

const signInFailure = () => {
  $('#sign-in-message').text('ERROR: Please try again')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
