'use strict'

const setAPIOrigin = require('../../../lib/set-api-origin')
const config = require('./config')

const fileUpload = function (data) {
  console.log('ajax data', data)
  return $.ajax({
    url: config.apiOrigin + '/files',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  fileUpload
}
