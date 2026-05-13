require('dotenv').config()
const connectDB = require('../config/db')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

async function run() {
  await connectDB()

  const name = 'Aman gupta'
  const email = 'guptaaaman6378@gmail.com'
  const password = '123456'
  const role = 'Admin'

  try {
    const hashed = await bcrypt.hash(password, 10)
    let user = await User.findOne({ email })
    if (user) {
      user.name = name
      user.role = role
      user.password = hashed
      await user.save()
      console.log('Updated existing user to Admin:', email)
    } else {
      user = new User({ name, email, password: hashed, role })
      await user.save()
      console.log('Created new Admin user:', email)
    }
    process.exit(0)
  } catch (err) {
    console.error('Error creating/updating admin user', err)
    process.exit(1)
  }
}

run()
