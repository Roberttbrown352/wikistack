const express = require('express')
const PORT = 8080
const app = express()
const {db, User, Page} = require('./models')
const wiki = require('./routes/wiki')
const users = require('./routes/users')

db.authenticate().then(() => {
  console.log('Connected to database')
})

const morgan = require('morgan')
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
  res.redirect('/wiki')
})

app.use('/wiki', wiki)

const init = async () => {
  await db.sync({force: true})

    app.listen(PORT, () => {
  console.log('Listening on Port')
  })
}

init()
