'use strict'
import filestack from 'filestack-js'
const getFormFields = require(`../../../lib/get-form-fields`)
const fileapi = require('./fileapi')
const fileui = require('./fileui')
const store = require('../store')

const fsClient = filestack.init('Ar0N2R53YQky6sT5yTl3Kz')
function openPicker () {
  fsClient.pick({
    fromSources:["local_file_system","url","imagesearch","facebook","instagram","googledrive","dropbox"],
    accept:["image/*","video/*","audio/*",".pdf",".doc",".docx",".docm","text/plain"],
    maxFiles: 3
  }).then(function (response) {
    // console.log(response)
    // console.log(JSON.stringify(response))
    let getImageurl = response.filesUploaded[0].url
    urlImport(getImageurl)
    console.log(getImageurl)
    // handleFilestack(response)
  })
}

const onFileUpload = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  fileapi.fileUpload(data)
    .then(fileui.fileCreateSuccess)
    .catch(fileui.fileCreateFailure)
}

function urlImport (getImageurl) {
  document.querySelector('.modal-url').value = getImageurl
}
const addFileHandlers = () => {
  $('.file-picker-button').on('click', openPicker)
  $('#file-upload-form').on('submit', onFileUpload)
}

module.export = {
  onFileUpload,
  addFileHandlers
}
