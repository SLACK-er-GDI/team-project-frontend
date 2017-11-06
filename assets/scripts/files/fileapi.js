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

module.exports = {
  fileUpload
}
