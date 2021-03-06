// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for vinyls
const Vinyl = require('../models/vinyl')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// instantiate axios
const axios = require('axios')

// INDEX
// GET /vinyls
router.get('/vinyls', requireToken, async (req, res, next) => {
  try {
    // search db for all vinyls owned by user
    // returns a list of records containing vinyl_id
    let vinyls = await Vinyl.find({owner: req.user._id})
    // map through each of the vinyls returned from the db and make
    // request to api with axios. Each call to axios() returns a promise
    // whether successful or not.
    let results = vinyls.map(v => (
      axios(`https://api.discogs.com/masters/${v.vinyl_id}`)
    ))
    // Promise.all returns an array of all the promise values
    // return the data from each of the calls
    results = await Promise.all(results)
    // Merge api returned results with db returned vinyls objects
    results = results.map(v => v.data)
    vinyls = vinyls.map((vinyl, i) => ({...results[i], ...vinyl.toObject()}))
    // respond with status 200 and JSON of the vinyls
    res.status(200).json({ vinyls: vinyls })
  } catch (err) {
    // For some reason the custom handler does not send back 500.
    // Client just hangs waiting
    // handle(err, res)
    next(err)
  }
})

// SHOW
// GET /vinyls/5a7db6c74d55bc51bdf39793
router.get('/vinyls/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Vinyl.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "vinyl" JSON
    .then(vinyl => res.status(200).json({ vinyl: vinyl.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /vinyls
router.post('/vinyls', requireToken, (req, res) => {
  // set owner of new vinyl to be current user
  console.log(req.body)
  req.body.vinyl.owner = req.user.id

  Vinyl.create(req.body.vinyl)
    // respond to succesful `create` with status 201 and JSON of new "vinyl"
    .then(vinyl => {
      res.status(201).json({ vinyl: vinyl.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

// UPDATE
// PATCH /vinyls/5a7db6c74d55bc51bdf39793
router.patch('/vinyls/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.vinyl.owner

  Vinyl.findById(req.params.id)
    .then(handle404)
    .then(vinyl => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, vinyl)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.vinyl).forEach(key => {
        if (req.body.vinyl[key] === '') {
          delete req.body.vinyl[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return vinyl.update(req.body.vinyl)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// DESTROY
// DELETE /vinyls/5a7db6c74d55bc51bdf39793
router.delete('/vinyls/:id', requireToken, (req, res) => {
  Vinyl.findById(req.params.id)
    .then(handle404)
    .then(vinyl => {
      // throw an error if current user doesn't own `vinyl`
      requireOwnership(req, vinyl)
      // delete the vinyl ONLY IF the above didn't throw
      vinyl.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
