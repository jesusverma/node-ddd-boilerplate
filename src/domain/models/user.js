const { attributes } = require('structure')

const User = attributes({
  uid: { type: String, required: true, exactLength: 40 },
  FirstName: { type: String },
  LastName: { type: String },
  Address: { type: String },
  City: { type: String },
})(class User {})

module.exports = User
