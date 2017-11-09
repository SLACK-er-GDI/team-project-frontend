'use stict'
import filestack from 'filestack-js'
const config = require('../config')
const store = require('../store')

let newSecurity

const getFilestackPolicy = function () {
  return $.ajax({
    url: 'http://localhost:4741/filestack',
    method: 'GET'
  }).then((security) => {
    let api = security.api
    let policyAndSignature = {
      policy: security.policy,
      signature: security.signature
    }
    store.policy = policyAndSignature.policy
    store.signature = policyAndSignature.signature
    fsClient = filestack.init(api, policyAndSignature)
  })
}

let fsClient

function openPicker () {
  fsClient.pick({
    // Controls where users can select files from
    fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox"],
    // Controls types of files that users can store
    accept: ["image/*", "video/*", "audio/*", ".pdf", ".doc", ".docx", ".docm", "text/plain"],
    // Controls number of files users can upload at a time
    // Response is the object that Filestack returns aftre upload is complete
  }).then(function (response) {
    // getImageurl parses out the URL received from Filestack and stores it in variable
    let getImageurl = response.filesUploaded[0].url
    // const Call function to place the Filestack URL in the form field
    urlImport(getImageurl)
    // handleFilestack(response)
  })
}

// This sets the form value for pared URL received from Filestack
function urlImport (getImageurl) {
  document.querySelector('.modal-url').value = getImageurl
  document.querySelector('#modal-url').value = getImageurl
}

const addFileStackHandlers = function () {
  $('.file-picker-button').on('click', openPicker)
}

module.exports = {
  addFileStackHandlers,
  fsClient,
  getFilestackPolicy,
  newSecurity
}
