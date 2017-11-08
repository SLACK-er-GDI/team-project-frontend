'use strict'

// const fileapi = require('./fileapi')
const showUploadsTemplate = require('../templates/helpers/user-uploads.handlebars')
const showAllUploadsTemplate = require('../templates/helpers/alluploads.handlebars')
const moment = require('moment')

const store = require('../store')

const dateFormatter = function (data) {
  for (let i = 0; i < data.length; i++) {
    const formatUpdated = data[i].updatedAt.split('T')
    const formatCreation = data[i].createdAt.split('T')
    data[i].createdAt = moment(formatCreation[0]).format('LL')
    data[i].updatedAt = moment(formatUpdated[0]).format('LL')
  }
}

const fileCreateSuccess = () => {
  console.log('file created successfully')
  $('#file-upload-modal').modal('hide')
  $('#file-upload-modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const fileCreateFailure = () => {
  console.log('file create failed.')
}

const fileCreateAllSuccess = () => {
  console.log('file created successfully')
  $('#file-upload-all-modal').modal('hide')
  $('#file-upload-all-modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
}

const fileCreateAllFailure = () => {
  console.log('file create failed...... shit')
}

const getUploadsSuccess = (data) => {
  console.log('data is', data)
  const policy = store.policy
  console.log('policy', policy)
  const signature = store.signature
  const newData = []
  for (let i = 0, l = data.upload.length; i < l; i++) {
    data.upload[i].url = data.upload[i].url + '?policy=' + policy + '&signature=' + signature
    newData.push(data.upload[i])
  }
  console.log('this is newData', newData)
  dateFormatter(newData)
  const showUploadsHtml = showAllUploadsTemplate({ uploads: newData })
  console.log(data.upload)
  $('#uploads-thumbnails').html(showUploadsHtml)
  $('[data-toggle="popover"]').popover()

  console.log('got uploads successfully')
  console.log('get uploads data is ', data)
  $('#get-uploads-link').hide()
  $('#file-upload-all-link').show()
  $('#file-upload-link').hide()
  $('#get-user-uploads-link').show()
}

const getUploadsFailure = () => {
  console.log('get uploads failed.')
}

const deleteUploadSuccess = (data) => {
  console.log('delete upload successfully')
  console.log('delete upload data is ', data)
}

const deleteUploadFailure = () => {
  console.log('delete upload failed.')
}

const getUserUploadsSuccess = (data) => {
  console.log('user', data)
  if (data.length !== 0) {
    const policy = store.policy
    const signature = store.signature
    const newData = []
    for (let i = 0, l = data.length; i < l; i++) {
      data[i].url = data[i].url + '?policy=' + policy + '&signature=' + signature
      newData.push(data[i])
    }
    dateFormatter(newData)
    const showUploadsHtml = showUploadsTemplate({ uploads: newData })
    $('#uploads-thumbnails').html(showUploadsHtml)
    $('[data-toggle="popover"]').popover()
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
  $('#get-uploads-link').show()
  $('#file-upload-all-link').hide()
  $('#file-upload-link').show()
  $('#get-user-uploads-link').hide()
}

// const getUploadsSuccess = (data) => {
//   const policy = store.policy
//   const signature = store.signature
//   const newData = []
//   for (let i = 0, l = data.upload.length; i < l; i++) {
//     data.upload[i].url = data.upload[i].url + '?policy=' + policy + '&signature=' + signature
//     newData.push(data.upload[i])
//   }
//   console.log(newData.upload)
//   const showUploadsHtml = showAllUploadsTemplate({ uploads: newData })

const getUserUploadsFailure = () => {
  console.log('get User Uploads failed.')
}

const updateUploadSuccess = () => {
  console.log('update upload successfully')
  $('#edit-upload-modal').modal('hide')
  $('#edit-upload-form')[0].reset()
}

const updateUploadFailure = () => {
  console.log('update upload failed...... shit')
}

module.exports = {
  fileCreateSuccess,
  fileCreateFailure,
  getUploadsSuccess,
  getUploadsFailure,
  deleteUploadFailure,
  deleteUploadSuccess,
  getUserUploadsFailure,
  getUserUploadsSuccess,
  updateUploadSuccess,
  updateUploadFailure,
  fileCreateAllSuccess,
  fileCreateAllFailure
}
