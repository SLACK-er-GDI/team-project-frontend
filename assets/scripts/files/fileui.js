'use strict'

// const fileapi = require('./fileapi')
const showUploadsTemplate = require('../templates/helpers/user-uploads.handlebars')
const showAllUploadsTemplate = require('../templates/helpers/alluploads.handlebars')

const fileCreateSuccess = () => {
  console.log('file created successfully')
  $('#file-upload-modal').modal('hide')
  $('#file-upload-modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const fileCreateFailure = () => {
  console.log('file create failed...... shit')
}

const getUploadsSuccess = (data) => {
  const showAllUploadsHtml = showAllUploadsTemplate({ uploads: data.upload })
  $('#uploads-thumbnails').html(showAllUploadsHtml)

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
  console.log('data.length is ', data.length)
  if (data.length !== 0) {
    const showUploadsHtml = showUploadsTemplate({ uploads: data })
    $('#uploads-thumbnails').html(showUploadsHtml)
  } else {
    const showUploadsHtml = showUploadsTemplate({ uploads: data })
    $('#uploads-thumbnails').html(showUploadsHtml)
    $('#no-uploads-message').show()
    $('#no-uploads-message').text('You don\'t have any files to display')
    window.setTimeout(function () {
      $('#no-uploads-message').fadeOut()
    }, 3000)
  }
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
