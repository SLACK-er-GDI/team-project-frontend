'use strict'

const store = require('../store')

const signUpSuccess = (data) => {
  console.log('success')
  $('#sign-up-form').modal('hide')
  // $('#sign-in-form').modal('show')
  // Used to clear out login data
  $('#sign-up-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const signUpFailure = () => {
  $('#sign-up-message').text('ERROR: Email in use or you fat-fingered the password')
}

const signInSuccess = (response) => {
  $('#sign-in-message').text('Sign In to Load Files')
  $('#sign-in-email').removeData()
  $('#sign-in-password').val('')
  $('#sign-in-form').modal('hide')
  $('#sign-in-link').hide()
  $('#sign-out-link').show()
  $('#sign-up-link').hide()
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

const changePasswordSuccess = () => {
  $('#change-password-form').modal('hide')
  // Used to clear out login data
  $('#change-password-form').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const changePasswordFailure = () => {
  $('#change-password-message').text('ERROR: Please try again')
}

const initializeForm = () => {
  $('#sign-out').hide()
  $('#sign-out-link').hide()
  $('#change-password-link').hide()
  $('#file-upload-link').hide()
  $('#files-link').hide()
  $('#file-picker-form').hide()
  $('#sign-in-link').show()
  $('#sign-up-link').show()
  $('#sign-in-form').modal('show')
  store.user = null
}

const signOutSuccess = () => {
  initializeForm()
}

const signOutFailure = () => {
}

module.exports = {
  initializeForm,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
