const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
  .then(user => {
    if (!user) {

      return Promise.reject(new Error("Неправильная почта или пароль"));

    }
    return bcrypt.compare( password, user.password ).then(matched => {
      if (!matched) {
        return Promise.reject(new Error("Неправильная почта или пароль"));
      }
      return user;
    })
  
  })
};

module.exports = mongoose.model('auth', userSchema);