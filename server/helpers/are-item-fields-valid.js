const _isString = require('lodash/isString')
const _isBoolean = require('lodash/isBoolean')

const areItemFieldsValid = ({ text, isChecked = false, isImportant = false, description = '' }) =>
  _isString(text) && _isBoolean(isChecked) && _isBoolean(isImportant) && _isString(description)

module.exports = areItemFieldsValid
