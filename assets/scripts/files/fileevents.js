'use strict'
import filestack from 'filestack-js'
const getFormFields = require(`../../../lib/get-form-fields`)
const fileapi = require('./fileapi')
const fileui = require('./fileui')
const store = require('../store')

const getUploadsRefresh = function (event) {
  fileapi.getUploads()
    .then(filterUserUploads)
    .then(fileui.getUserUploadsSuccess)
    .then(onDeleteUpload)
    .then(editUpload)
    .then(updateUpload)
    .catch(fileui.getUserUploadsFailure)
}

const getAllUploadsRefresh = function (event) {
  fileapi.getUploads()
    .then(fileui.getUploadsSuccess)
    .catch(fileui.getUploadsFailure)
}

const onFileUpload = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (!jQuery.isEmptyObject(data.tags)) {
    data.upload['tags'] = Object.keys(data.tags)
  }
  data.upload['ownerEmail'] = store.user.email
  fileapi.fileUpload(data)
    .then(fileui.fileCreateSuccess)
    .then(getUploadsRefresh)
    .catch(fileui.fileCreateFailure)
}

const onFileUploadAll = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (!jQuery.isEmptyObject(data.tags)) {
    data.upload['tags'] = Object.keys(data.tags)
  }
  data.upload['ownerEmail'] = store.user.email
  fileapi.fileUpload(data)
    .then(fileui.fileCreateAllSuccess)
    .then(getAllUploadsRefresh)
    .catch(fileui.fileCreateAllFailure)
}

const onDeleteUpload = () => {
  $('.remove').on('click', function (event) {
    event.preventDefault()
    const index = $(event.target).attr('data-id')
    fileapi.deleteUpload(index)
    // Code below is commented out until backend functionality is complete
      .then(fileui.deleteUploadSuccess)
      .then(getUploadsRefresh)
      .catch(fileui.deleteUploadFailure)
  })
}

const checkboxChecker = (array) => {
  $('#Animal').prop('checked', false)
  $('#Art').prop('checked', false)
  $('#Business').prop('checked', false)
  $('#Cities').prop('checked', false)
  $('#Entertainment').prop('checked', false)
  $('#Food').prop('checked', false)
  $('#Landscapes').prop('checked', false)
  $('#Person').prop('checked', false)
  $('#People').prop('checked', false)
  $('#Science').prop('checked', false)
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase() === 'animal') {
      $('#Animal').prop('checked', true)
    } else if (array[i].toLowerCase() === 'art') {
      $('#Art').prop('checked', true)
    } else if (array[i].toLowerCase() === 'business') {
      $('#Business').prop('checked', true)
    } else if (array[i].toLowerCase() === 'cities') {
      $('#Cities').prop('checked', true)
    } else if (array[i].toLowerCase() === 'entertainment') {
      $('#Entertainment').prop('checked', true)
    } else if (array[i].toLowerCase() === 'food') {
      $('#Food').prop('checked', true)
    } else if (array[i].toLowerCase() === 'landscapes') {
      $('#Landscapes').prop('checked', true)
    } else if (array[i].toLowerCase() === 'people') {
      $('#People').prop('checked', true)
    } else if (array[i].toLowerCase() === 'science') {
      $('#Science').prop('checked', true)
    }
  }
}

const editUpload = () => {
  $('.edit').off('click')
  $('.edit').on('click', function (event) {
    // $('#add-trail-div').hide()
    // $('#add-trail-button').show()
    const index = $(event.target).attr('data-id')
    fileapi.getUserUpload(index).then(function (data) {
      const title = data.upload.title
      const description = data.upload.description
      // const url = data.update.url
      // const tags = data.update.tags
      store.uploadId = data.upload.id
      checkboxChecker(data.upload.tags)
      // $('#Animal').prop('checked', true)
      $("input[name='upload[title]'").val(title)
      $("input[name='upload[description]'").val(description)
    })
  })
}

const updateUpload = () => {
  $('#edit-upload-form').off('submit')
  $('#edit-upload-form').on('submit', function (event) {
    event.preventDefault()
    const data = getFormFields(this)
    if (!jQuery.isEmptyObject(data.tags)) {
      data.upload['tags'] = Object.keys(data.tags)
    }
    fileapi.updateUpload(data, store.uploadId)
      .then(fileui.updateUploadSuccess)
      .then(getUploadsRefresh)
      .catch(fileui.updateUploadFailure)
  })
}

const filterUserUploads = function (array) {
  const userArray = []
  for (let i = 0; i < array.upload.length; i++) {
    if (array.upload[i]._owner === store.user.id) {
      userArray.push(array.upload[i])
    } else {
    }
  }
  return userArray
}

const onGetUserUploads = function (event) {
  event.preventDefault()
  fileapi.getUploads()
    .then(filterUserUploads)
    .then(fileui.getUserUploadsSuccess)
    .then(onDeleteUpload)
    .then(editUpload)
    .then(updateUpload)
    .catch(fileui.getUserUploadsFailure)
}

const onGetUploads = function (event) {
  event.preventDefault()
  fileapi.getUploads()
    .then(fileui.getUploadsSuccess)
    .then(onDeleteUpload)
    .catch(fileui.getUploadsFailure)
}

// This sets the form value for pared URL received from Filestack
// function urlImport (getImageurl) {
//   document.querySelector('.modal-url').value = getImageurl
// }

const addFileHandlers = function () {
  // When 'upload' button is clicked, the Filestack uploader will be called
  // $('.file-picker-button').on('click', openPicker)
  // When user saves form, the function that stores the form info is call
  $('#file-upload-form').on('submit', onFileUpload)
  $('#file-upload-all-form').on('submit', onFileUploadAll)
  $('#get-uploads-link').on('click', onGetUploads)
  $('#get-user-uploads-link').on('click', onGetUserUploads)
  $('#file-upload-link').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  $('#file-upload-all-link').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset')
  })
  $('#file-upload-all-link').on('click', fileui.clearFormFields)
  $('#file-upload-link').on('click', fileui.clearFormFields)
}

module.exports = {
  onFileUpload,
  addFileHandlers,
  onDeleteUpload,
  onFileUploadAll,
  onGetUploads,
  onGetUserUploads
}
