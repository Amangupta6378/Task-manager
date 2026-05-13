require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

const connect = require('./config/db');

async function seed() {
  await connect();
  await mongoose.connection.db.dropDatabase();

  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('AdminPass123', salt);
  const memberPass = await bcrypt.hash('MemberPass123', salt);

  const admin = await User.create({ name: 'Alex Manager', email: 'alex@company.com', password: adminPass, role: 'Admin' });
  const member = await User.create({ name: 'Sam Contributor', email: 'sam@company.com', password: memberPass, role: 'Member' });

  const project = await Project.create({ title: 'Product Revamp', description: 'Revamp landing and API docs', owner: admin._id, members: [member._id] });

  const tasks = [
    { title: 'Fix Navbar mobile bug', description: 'Menu not collapsing on iOS Safari', dueDate: new Date(Date.now() + 2*24*60*60*1000), status: 'In Progress', assignedTo: member._id, project: project._id },
    { title: 'Update API documentation', description: 'Add new endpoints and examples', dueDate: new Date(Date.now() + 5*24*60*60*1000), status: 'Todo', assignedTo: member._id, project: project._id },
    { title: 'Audit dependencies', description: 'Address security warnings', dueDate: new Date(Date.now() - 2*24*60*60*1000), status: 'Todo', assignedTo: admin._id, project: project._id }
  ];

  await Task.insertMany(tasks);
  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
