'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  store.onSignUpSignIn = data
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signUpSignIn = function (data) {
  console.log('signin', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: store.onSignUpSignIn
  })
}

const signIn = function (data) {
  console.log('signin', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  signUpSignIn
}
