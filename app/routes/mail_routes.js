'use strict'
// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

const nodemailer = require('nodemailer')

// Send Wishlist
// POST /mailer
router.post('/mailer', requireToken, (req, res) => {
  const {from, to, subject, html} = req.body.mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })
  const mailOptions = { from, to, subject, html }
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).json({success: 'failure'})
      return
    }
    res.status(201).json({
      success: 'success',
      messageId: info.messageId
    })
  })
})

module.exports = router
