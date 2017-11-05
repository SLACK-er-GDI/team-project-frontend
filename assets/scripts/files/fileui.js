'use strict'

const fileapi = require('./fileapi')

const fileCreateSuccess = () => {
  console.log('file created successfully')
}

const fileCreateFailure = () => {
  console.log('file create failed...... shit')
}

module.exports = {
  fileCreateSuccess,
  fileCreateFailure
}