function slugFilter(title) {
  return title.replace(/\s/g, '').replace(/[^\w\s]/gi, '')
}

module.exports = slugFilter
