const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const User = require('../src/models/user')
const mongoose = require('mongoose')
const Task = require('../src/models/task')
const {userOneID,
    userOne,
    setupDB,
    userTwo,
    userTwoID,
    taskOne,
    taskTwo,
    taskThree } = require('./fixtures/db')

beforeEach(setupDB)


test('should create task', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'from my test'
        }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('should fetch user one tasks', async () => {
    const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(res.body.length).toEqual(2)
})

test('should not delete other user tasks',async()=>{
    const res =await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization' ,`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})