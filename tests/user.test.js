const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneID,userOne,setupDB} = require('./fixtures/db')
 
beforeEach(setupDB)

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'mohamed',
        email: 'mohamedabdelhakem94@yahoo.com',
        password: 'mypass777!'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'mohamed',
            email: 'mohamedabdelhakem94@yahoo.com',

        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mypass777!')
})



test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneID);
    expect(response.body.token).toBe(user.tokens[1].token)
})
test('should upload avatar images',async ()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)
    const user = await User.findById(userOneID);
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('should not login a non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'mohamed@hha.com',
        password: '465565'
    }).expect(400)
})

test('should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should not get user profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})
test('should delete authorized user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})
test('should not delete unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should update field',async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'jessy'
    })
    .expect(200)
    const user = await User.findById(userOneID)
    expect(user.name).toEqual('jessy')
})



test('should non update invalid field',async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'alex'
    })
    .expect(400)
})

