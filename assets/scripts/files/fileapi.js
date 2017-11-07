'use strict'

const config = require('../config')
const store = require('../store')

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

const editUpload = function (index, data) {
  console.log('api data is ', data)
  console.log('api index is ', index)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  fileUpload,
  getUploads,
  deleteUpload,
  editUpload
}
