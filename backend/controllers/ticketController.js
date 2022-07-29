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

// Get user ticket
// GET /api/tickets/:id
// @access Private
const getTicket = expressAsyncHandler(async (req, res) => {
  // Get user using jwt token
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  // const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id })

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  res.status(200).json(ticket)
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

// Delete ticket
// DELETE /api/tickets/:id
// @access Private
const deleteTicket = expressAsyncHandler(async (req, res) => {
  // Get user using jwt token
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  // const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id })

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

// Update ticket
// PUT /api/tickets/:id
// @access Private
const updateTicket = expressAsyncHandler(async (req, res) => {
  // Get user using jwt token
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  // const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user.id })

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
