const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

const app = express()

// To handle the url encoded incoming data via api
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ message: `Welcome to Support Desk API` })
})

// Routes
app.use('/api/users', require('./routes/userRoute'))

// Error middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
