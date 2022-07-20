// Register users
const registerUser = (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all the fields')
  }
}

// Login users
const loginUser = (req, res) => {
  res.send('Login Route')
}

module.exports = {
  registerUser,
  loginUser,
}
