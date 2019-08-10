
const Task = require('../../src/models/task')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const mongoose = require('mongoose')

const userOneID = new mongoose.Types.ObjectId();
const userTwoID = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneID,
    name: "salah",
    email: 'mike@example.com',
    password: '55554444',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_KEY)
    }]
}
const userTwo = {
    _id: userTwoID,
    name: "ali",
    email: 'ali@example.com',
    password: '55554444',
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_KEY)
    }]
}

const taskOne = {
    _id :new mongoose.Types.ObjectId(),
    description:"First task"
   , owner: userOneID
}

const taskTwo = {
    _id :new mongoose.Types.ObjectId(),
    description:"second task",
    completed:true
   , owner: userOneID
}

const taskThree= {
    _id :new mongoose.Types.ObjectId(),
    description:"Third task",
    completed:true
   , owner: userTwoID
}
const setupDB = async () => {
    await User.deleteMany({})
    await Task.deleteMany({})
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
} 

module.exports ={
    userOneID,
    userOne,
    setupDB,
    userTwo,
    userTwoID,
    taskOne,
    taskTwo,
    taskThree
}
