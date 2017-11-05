'use strict'

const fileapi = require('./fileapi')
const store = require('../store')

const fileCreateSuccess = () => {
  console.log('file created successfully')
}

const fileCreateFailure = () => {
  console.log('file create failed...... shit')
}

module.export = {
  fileCreateSuccess,
  fileCreateFailure
}