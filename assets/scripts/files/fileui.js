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

const alertCallerSuccess = (alertLocation, alertMessage) => {
  $('#' + alertLocation).addClass('alert alert-success').html(alertMessage)
  setTimeout(function () {
    $('#' + alertLocation).removeClass('alert alert-success').html('')
  }, 1500)
}

const alertCallerFailure = (alertLocation, alertMessage) => {
  $('#' + alertLocation).addClass('alert alert-danger').html(alertMessage)
  setTimeout(function () {
    $('#' + alertLocation).removeClass('alert alert-danger').html('')
  }, 1500)
}

const fileCreateSuccess = () => {
  $('#file-upload-modal').modal('hide')
  $('#file-upload-modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  $('#file-upload-form')[0].reset()
  alertCallerSuccess('frontSuccess', 'Upload Success')
}

const fileCreateFailure = () => {
  alertCallerFailure('frontError', 'Upload Failure')
}

const fileCreateAllSuccess = () => {
  $('#file-upload-all-modal').modal('hide')
  $('#file-upload-all-modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  $('#file-upload-all-form')[0].reset()
  alertCallerSuccess('frontSuccess', 'Upload Success')
}

const fileCreateAllFailure = () => {
  alertCallerFailure('frontError', 'Upload Failure')
}

const getUploadsSuccess = (data) => {
  const policy = store.policy
  const signature = store.signature
  const newData = []
  for (let i = 0, l = data.upload.length; i < l; i++) {
    data.upload[i].url = data.upload[i].url + '?policy=' + policy + '&signature=' + signature
    newData.push(data.upload[i])
  }
  dateFormatter(newData)
  const showUploadsHtml = showAllUploadsTemplate({ uploads: newData })
  $('#uploads-thumbnails').html(showUploadsHtml)
  $('[data-toggle="popover"]').popover()
  $('#get-uploads-link').hide()
  $('#file-upload-all-link').show()
  $('#file-upload-link').hide()
  $('#get-user-uploads-link').show()
}

const getUploadsFailure = () => {
  alertCallerFailure('frontError', 'Unable to Retrieve Uploads')
}

const deleteUploadSuccess = (data) => {
  alertCallerSuccess('frontSuccess', 'Upload Deleted')
}

const deleteUploadFailure = () => {
  alertCallerFailure('frontError', 'Delete Upload Failure')
}

const getUserUploadsSuccess = (data) => {
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
  $('#get-uploads-link').show()
  $('#file-upload-all-link').hide()
  $('#file-upload-link').show()
  $('#get-user-uploads-link').hide()
}

const getUserUploadsFailure = () => {
  alertCallerFailure('frontError', 'Unable to Retrieve User Uploads')
}

const updateUploadSuccess = () => {
  $('#edit-upload-modal').modal('hide')
  $('#edit-upload-form')[0].reset()
  alertCallerSuccess('frontSuccess', 'Upload Updated')
}

const updateUploadFailure = () => {
  alertCallerFailure('frontError', 'Upload Update Failure')
}

const clearFormFields = (event) => {
  // $('#modal-url').val('')
  // $('.modal-url').val('')
  $('#file-upload-form')[0].reset()
  $('#file-upload-all-form')[0].reset()
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
  fileCreateAllFailure,
  clearFormFields
}
