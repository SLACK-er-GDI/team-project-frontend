'use strict'

// const fileapi = require('./fileapi')
const showUploadsTemplate = require('../templates/helpers/alluploads.handlebars')

const store = require('../store')

const fileCreateSuccess = () => {
  console.log('file created successfully')
}

const fileCreateFailure = () => {
  console.log('file create failed.')
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
  console.log(newData.upload)
  const showUploadsHtml = showUploadsTemplate({ uploads: newData })
  console.log(data.upload)
  $('#uploads-thumbnails').html(showUploadsHtml)

  console.log('got uploads successfully')
  console.log('get uploads data is ', data)
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
  console.log(data)
  const showUploadsHtml = showUploadsTemplate({ uploads: data })
  $('#uploads-thumbnails').html(showUploadsHtml)
  console.log('get User Uploads successfully')
}

const getUserUploadsFailure = () => {
  console.log('get User Uploads failed.')
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

