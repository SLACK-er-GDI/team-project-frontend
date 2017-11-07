'use strict'
import filestack from 'filestack-js'
const getFormFields = require(`../../../lib/get-form-fields`)
const fileapi = require('./fileapi')
const fileui = require('./fileui')
const store = require('../store')

// Function for lauching Filestack uploader
const fsClient = filestack.init('Ar0N2R53YQky6sT5yTl3Kz')

function openPicker() {
  fsClient.pick({
    // Controls where users can select files from
    fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox"],
    // Controls types of files that users can store
    accept: ["image/*", "video/*", "audio/*", ".pdf", ".doc", ".docx", ".docm", "text/plain"],
    // Controls number of files users can upload at a time
    maxFiles: 3
    // Response is the object that Filestack returns aftre upload is complete
  }).then(function(response) {
    // getImageurl parses out the URL received from Filestack and stores it in variable
     let getImageurl = response.filesUploaded[0].url
    //const Call function to place the Filestack URL in the form field
    urlImport(getImageurl)
    // handleFilestack(response)
  })
}

const getUploadsRefresh = function (event) {
  fileapi.getUploads()
    .then(filterUserUploads)
    .then(fileui.getUserUploadsSuccess)
    .then(onDeleteUpload)
    .catch(fileui.getUserUploadsFailure)
}

const onFileUpload = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (!jQuery.isEmptyObject(data.tags)) {
    data.upload['tags'] = Object.keys(data.tags)
  }
  console.log(data)
  fileapi.fileUpload(data)
    // Code below is commented out until backend functionality is complete
    .then(fileui.fileCreateSuccess)
    .catch(fileui.fileCreateFailure)
}

const onGetUploads = function (event) {
  event.preventDefault()
  fileapi.getUploads()
    // Code below is commented out until backend functionality is complete
    .then(fileui.getUploadsSuccess)
    .then(onDeleteUpload)
    .catch(fileui.getUploadsFailure)
}

const onDeleteUpload = () => {
  $('.remove').on('click', function (event) {
    const index = $(event.target).attr('data-id')
    console.log('index is', index)
    fileapi.deleteUpload(index)
    // Code below is commented out until backend functionality is complete
      .then(fileui.deleteUploadSuccess)
      .then(getUploadsRefresh)
      .catch(fileui.deleteUploadFailure)
  })
}

const filterUserUploads = function (array) {
  const userArray = []
  for (let i = 0; i < array.upload.length; i++) {
    if (array.upload[i]._owner === store.user.id) {
      userArray.push(array.upload[i])
    } else {
      console.log('This one does not match', array.upload[i])
    }
  }
  console.log(userArray)
  return userArray
}

const onGetUserUploads = function (event) {
  event.preventDefault()
  fileapi.getUploads()
    // Code below is commented out until backend functionality is complete
    .then(filterUserUploads)
    .then(fileui.getUserUploadsSuccess)
    .then(onDeleteUpload)
    .catch(fileui.getUserUploadsFailure)
}

// This sets the form value for pared URL received from Filestack
function urlImport (getImageurl) {
  document.querySelector('.modal-url').value = getImageurl
}

const addFileHandlers = function () {
  // When 'upload' button is clicked, the Filestack uploader will be called
  $('.file-picker-button').on('click', openPicker)
  // When user saves form, the function that stores the form info is called
  $('#file-upload-form').on('submit', onFileUpload)
  $('#get-uploads-link').on('click', onGetUploads)
  $('#get-user-uploads-link').on('click', onGetUserUploads)
}

module.exports = {
  onFileUpload,
  addFileHandlers,
  onGetUploads,
  onDeleteUpload
}
