'use strict'

import filestack from 'filestack-js'

const config = require('../config')
const store = require('../store')
// const filestackSecurity = require('./filestack')

// Used to send title, link to file, and tags to DB
// Currently commented out until backend functionality is completed
const fileUpload = function (data) {
  console.log('ajax data', data)
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getUploads = function () {
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteUpload = function (data) {
  console.log('api data is ', data)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}



module.exports = {
  fileUpload,
  getUploads,
  deleteUpload
}
