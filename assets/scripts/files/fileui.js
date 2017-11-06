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
  $('#uploads-thumbnails').html(showUploadsHtml)

  console.log('got uploads successfully')
  console.log('get uploads data is ', data)
}

const getUploadsFailure = () => {
  console.log('get uploads failed...... shit')
}

const deleteUploadSuccess = (data) => {
  console.log('delete upload successfully')
  console.log('delete upload data is ', data)
}

const deleteUploadFailure = () => {
  console.log('delete upload failed...... shit')
}

const getUserUploadsSuccess = (data) => {
  const showUploadsHtml = showUploadsTemplate({ uploads: data.upload })
  $('#uploads-thumbnails').html(showUploadsHtml)
  console.log('get User Uploads successfully')
}

const getUserUploadsFailure = () => {
  console.log('get User Uploads failed...... shit')
}

module.exports = {
  fileCreateSuccess,
  fileCreateFailure,
  getUploadsSuccess,
  getUploadsFailure,
  deleteUploadFailure,
  deleteUploadSuccess,
  getUserUploadsFailure,
  getUserUploadsSuccess
}
