// ROUTER IMPORTS / INITIALIZATION
// --------------------------------------------|
// bring in express
const express = require('express')
// brings in database helper methods
const Users = require('./user-model.js')
// initialize express router
const router = express.Router()
// --------------------------------------------|
// ROUTER ENDPOINTS ---------------------------|
// --------------------------------------------|
// GET Request returns all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.find()

    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to get users' })
  }
})
// --------------------------------------------|
// GET Request returns user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await Users.findById(id)

    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Could not find user with given id.' })
  }
})
// --------------------------------------------|
// POST Request inserts new user and returns new user
router.post('/', async (req, res) => {
  const userData = req.body

  try {
    const newUser = await Users.add(userData)

    res.status(201).json(newUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to create new user' })
  }
})
// --------------------------------------------|
// PUT Request updates a user by id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body

  try {
    const user = await Users.update(changes, id)

    // if user exists ? does exist : does not exist
    user
      ? res.json(user)
      : res.status(404).json({ message: 'Could not find user with given id' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to update user' })
  }
})
// --------------------------------------------|
// DELETE Request removes a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await Users.remove(id)

    // if deleted ? deleted : failed
    deleted
      ? res.json({ removed: deleted })
      : res.status(404).json({ message: 'Could not find user with given id' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to delete user' })
  }
})
// --------------------------------------------|
// GET Request returns all posts by user
router.get('/:id/posts', async (req, res) => {
  const { id } = req.params

  try {
    const userPosts = await Users.findPosts(id)

    res.json(userPosts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to get posts' })
  }
})
// --------------------------------------------|
// EXPORT ROUTER
module.exports = router
