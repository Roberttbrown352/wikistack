const express = require('express')
const router = express.Router()
const {addPage} = require('../views/')
const wikipage = require('../views/wikipage')
const main = require('../views/main')
const { Page, User } = require('../models')
const slugFilter = require('../slugFilter')

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll()
    res.send(main(pages))
  }
  catch(error){
    next(error)
  }
})

router.post('/', async (req,res,next) => {
  const title = req.body.title
  const content = req.body.content
  try {
    const page = await Page.create({
      title,
      content
    })
    res.redirect(`/wiki/${page.slug}`)
  }
  catch(error) {
    next(error)
  }
})

router.get('/add', (req,res) => {
  res.send(addPage())
})

router.get('/:slug', async (req,res, next) => {
  try{
  const page = await Page.findAll({where: {slug: req.params.slug}})
  res.send(wikipage(page[0]))
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
