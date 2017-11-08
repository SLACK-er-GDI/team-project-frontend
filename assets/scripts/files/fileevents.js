'use strict'
import filestack from 'filestack-js'
const getFormFields = require(`../../../lib/get-form-fields`)
const fileapi = require('./fileapi')
const fileui = require('./fileui')

// Function for lauching Filestack uploader
// const fsClient = filestack.init('Ar0N2R53YQky6sT5yTl3Kz')

// filestack.init('Ar0N2R53YQky6sT5yTl3Kz', policy, signature)
// let fsClient

// ajaxy('/myRoute').then((security) => {
//   fsClient = fsClient.init(API_KEY, security)
// })

// function openPicker() {
//   fsClient.pick({
//     // Controls where users can select files from
//     fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox"],
//     // Controls types of files that users can store
//     accept: ["image/*", "video/*", "audio/*", ".pdf", ".doc", ".docx", ".docm", "text/plain"],
//     // Controls number of files users can upload at a time
//     maxFiles: 3
//     // Response is the object that Filestack returns aftre upload is complete
//   }).then(function(response) {
//     // getImageurl parses out the URL received from Filestack and stores it in variable
//      let getImageurl = response.filesUploaded[0].url
//     //const Call function to place the Filestack URL in the form field
//     urlImport(getImageurl)
//     // handleFilestack(response)
//   })
// }

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
  console.log('get all uploads refresh is being called')
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
  console.log(data)
  fileapi.fileUpload(data)
    // Code below is commented out until backend functionality is complete
    .then(fileui.fileCreateSuccess)
    .then(getUploadsRefresh)
    .catch(fileui.fileCreateFailure)
}

const onFileUploadAll = function (event) {
  console.log('onFileUploadAll is being called')
  event.preventDefault()
  const data = getFormFields(event.target)
  if (!jQuery.isEmptyObject(data.tags)) {
    data.upload['tags'] = Object.keys(data.tags)
  }
  console.log(data)
  fileapi.fileUpload(data)
    // Code below is commented out until backend functionality is complete
    .then(fileui.fileCreateAllSuccess)
    .then(getAllUploadsRefresh)
    .catch(fileui.fileCreateAllFailure)
}

const onDeleteUpload = () => {
  $('.remove').on('click', function (event) {
    event.preventDefault()
    const index = $(event.target).attr('data-id')
    console.log('index is', index)
    fileapi.deleteUpload(index)
    // Code below is commented out until backend functionality is complete
      .then(fileui.deleteUploadSuccess)
      .then(getUploadsRefresh)
      .catch(fileui.deleteUploadFailure)
  })
}

const checkboxChecker = (array) => {
  $('#Animal').prop('checked', false)
  $('#Landscape').prop('checked', false)
  $('#Person').prop('checked', false)
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 'animal') {
      $('#Animal').prop('checked', true)
    } else if (array[i] === 'landscape') {
      $('#Landscape').prop('checked', true)
    } else if (array[i] === 'person') {
      $('#Person').prop('checked', true)
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
      // const url = data.update.url
      // const tags = data.update.tags
      store.uploadId = data.upload.id
      checkboxChecker(data.upload.tags)
      // $('#Animal').prop('checked', true)
      $("input[name='upload[title]'").val(title)
      console.log('store.uploadId is', store.uploadId)
    })
  })
}

const updateUpload = () => {
  $('#edit-upload-form').off('submit')
  $('#edit-upload-form').on('submit', function (event) {
    event.preventDefault()
    const data = getFormFields(this)
    if (data.tags !== null) {
      data.upload['tags'] = Object.keys(data.tags)
    }
    console.log(data)
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
  // When user saves form, the function that stores the form info is called
  $('#file-upload-form').on('submit', onFileUpload)
  $('#file-upload-all-form').on('submit', onFileUploadAll)
  $('#get-uploads-link').on('click', onGetUploads)
}

module.exports = {
  onFileUpload,
  addFileHandlers,
  onDeleteUpload,
  onFileUploadAll,
  onGetUploads
}
