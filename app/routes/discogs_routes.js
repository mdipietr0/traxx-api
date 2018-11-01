// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

// instantiate axios
const axios = require('axios')

const discogsBaseUrl = `https://api.discogs.com`

// SEARCH DISCOGS
// GET /discogs/search?q=abbey+road
router.get('/search', async (req, res, next) => {
  try {
    const results = await axios(`${discogsBaseUrl}/database/search?q=${req.query.q}&type=master&token=${process.env.DISCOGS_TOKEN}`)
    res.status(200).json(results.data)
  } catch (err) {
    // For some reason the custom handler does not send back 500.
    // Client just hangs waiting
    // handle(err, res)
    next(err)
  }
})

module.exports = router
