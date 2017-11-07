'use stict'
import filestack from 'filestack-js'
const config = require('../config')
const store = require('../store')

const getFilestackPolicy = function () {
  return $.ajax({
    url:  'http://localhost:4741/filestack',
    method: 'GET'
    // headers: {
    //   Authorization: 'Token token=' + store.user.token
    // }
  }).then((security) => {
    console.log('security ran', security)
    newSecurity = security
    console.log('newsec', newSecurity)
    // fsClient = filestack.init('Ar0N2R53YQky6sT5yTl3Kz', security)
    console.log('after security', fsClient)
  })
}
let newSecurity
let fsClient = filestack.init('Ar0N2R53YQky6sT5yTl3Kz', {policy: "eyJleHBpcnkiOjE1MTAwMzgwMDB9", signature: "c86d3375044c287f11548c2d3aa907f9a1993aaa6a1388e9e0da932fec75e0dc"})                                                                  
console.log('immeidate', fsClient)
// = filestack.init('Ar0N2R53YQky6sT5yTl3Kz', {
  // policy:"eyJleHBpcnkiOjE1MTAwMzA4MDB9",
  // signature:"183d764a4e0be552bb514d96f9b1915e8b292edddf625b1b59df9b3e5b5272f6"
// })




// ajaxy('/myRoute').then((security) => {
//   fsClient = fsClient.init(API_KEY, security)
// })

function openPicker () {
  console.log('picker', fsClient)
  fsClient.pick({
    // Controls where users can select files from
    fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox"],
    // Controls types of files that users can store
    accept: ["image/*", "video/*", "audio/*", ".pdf", ".doc", ".docx", ".docm", "text/plain"],
    // Controls number of files users can upload at a time
    // Response is the object that Filestack returns aftre upload is complete
  }).then(function(response) {
    console.log('response', response)
    // getImageurl parses out the URL received from Filestack and stores it in variable
     let getImageurl = response.filesUploaded[0].url
    //const Call function to place the Filestack URL in the form field
    urlImport(getImageurl)
    // handleFilestack(response)
  })
}

// This sets the form value for pared URL received from Filestack
function urlImport (getImageurl) {
  document.querySelector('.modal-url').value = getImageurl
}

const addFileStackHandlers = function () {
  $('.file-picker-button').on('click', openPicker)
}

module.exports = {
  addFileStackHandlers,
  fsClient,
  getFilestackPolicy
}
