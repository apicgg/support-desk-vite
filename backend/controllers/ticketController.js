const expressAsyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// Get user tickets
// GET /api/tickets
// @access Private
const getTickets = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: 'getTickets api' })
})

// Create new ticket
// POST /api/tickets
// @access Private
const createTicket = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: 'createTicket api' })
})

module.exports = { getTickets, createTicket }
