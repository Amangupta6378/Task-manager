require('dotenv').config()
const connectDB = require('../config/db')
const User = require('../models/User')

async function run(){
  await connectDB()
  const email = process.argv[2] || 'guptaaaman6378@gmail.com'
  const user = await User.findOne({ email }).select('-password')
  if(!user){
    console.log('User not found:', email)
    process.exit(0)
  }
  console.log('User found:')
  console.log(JSON.stringify(user, null, 2))
  process.exit(0)
}

run().catch(err=>{ console.error(err); process.exit(1) })
