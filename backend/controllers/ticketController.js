const expressAsyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// Get user tickets
// GET /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
  // Get user using jwt token
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// Create new ticket
// POST /api/tickets
// @access Private
const createTicket = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add product and description')
  }

  // Get user using jwt token
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Entry in the DB
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })

  res.status(201).json(ticket)
})

module.exports = { getTickets, createTicket }
