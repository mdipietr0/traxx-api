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

// CREATE
// POST /vinyls
router.post('/mailer', requireToken, (req, res) => {
  // const mail = req.body.mail
  console.log(req.body.mail)
  const {from, to, subject, html} = req.body.mail
  //
  // const from = '"Traxx 👻" <foo@example.com>'
  // const to = 'alissapifer@gmail.com dipietro.michael@gmail.com'
  // const subject = 'Hello ✔'
  // const html = '<b>Hello world?</b>'
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // generated ethereal user
      pass: '' // generated ethereal password
    }
  })

  const mailOptions = { from, to, subject, html }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.status(201).json({
      success: 'success',
      messageId: info.messageId
    })
  })
})

module.exports = router
