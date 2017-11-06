'use strict'
import filestack from 'filestack-js'
const getFormFields = require(`../../../lib/get-form-fields`)
const fileapi = require('./fileapi')
const fileui = require('./fileui')

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
     getImageurl = response.filesUploaded[0].url
    //const Call function to place the Filestack URL in the form field
    urlImport(getImageurl)
    // handleFilestack(response)
  })
}

const onFileUpload = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.tags !== null) {
    data.upload['tags'] = data.tags
  }
  console.log(data)
  fileapi.fileUpload(data)
    // Code below is commented out until backend functionality is complete
    .then(fileui.fileCreateSuccess)
    .catch(fileui.fileCreateFailure)
}

const onGetUploads = function () {
  event.preventDefault()
  fileapi.getUploads()
    // Code below is commented out until backend functionality is complete
    .then(fileui.getUploadsSuccess)
    .catch(fileui.getUploadsFailure)
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
}

module.exports = {
  onFileUpload,
  addFileHandlers,
  onGetUploads
}
