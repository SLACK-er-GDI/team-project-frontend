'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const fileevents = require('./files/fileevents')
const authevents = require('./auth/authevents')

// invokes click handlers for authentication and file actions
$(() => {
  fileevents.addFileHandlers()
  authevents.addAuthHandlers()
})

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
