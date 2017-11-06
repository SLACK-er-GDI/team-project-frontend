'use strict'

// const fileapi = require('./fileapi')
const showUploadsTemplate = require('../templates/helpers/alluploads.handlebars')

const fileCreateSuccess = () => {
  console.log('file created successfully')
}

const fileCreateFailure = () => {
  console.log('file create failed...... shit')
}

const getUploadsSuccess = (data) => {
  const showUploadsHtml = showUploadsTemplate({ uploads: data.upload })
  $('#uploads-thumbnails').append(showUploadsHtml)

  console.log('got uploads successfully')
  console.log('get uploads data is ', data)
}

const getUploadsFailure = () => {
  console.log('get uploads failed...... shit')
}

module.exports = {
  fileCreateSuccess,
  fileCreateFailure,
  getUploadsSuccess,
  getUploadsFailure
}
