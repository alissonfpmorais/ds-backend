const bcrypt = require('bcryptjs')

const hashPassword = (user) => {
  if (user.password !== null) {
    return bcrypt
      .hash(user.password, 10)
      .then(passwordHash => {
        user.password = passwordHash
      })
  }
}

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    birth: Sequelize.DATE,
    job: Sequelize.STRING,
    photo: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
    // instanceMethods: {
    //   validPassword: function (password) {
    //     return bcrypt.compare(password, this.password)
    //   }
    // }
  })

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User;
}