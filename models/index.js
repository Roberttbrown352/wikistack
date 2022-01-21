const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack')
const slugFilter = require('../slugFilter')

const Page = db.define('page', {
  title: {type: Sequelize.STRING, allowNull: false},
  slug: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM('open','closed'), defaultValue: 'closed'}
})

const User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}}
})

Page.addHook('beforeValidate',(page,options) => {
  page.slug = slugFilter(page.title)
})

module.exports = {
  db,
  Page,
  User
}
