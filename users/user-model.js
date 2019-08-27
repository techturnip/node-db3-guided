// DATABASE HELPER METHODS
// --------------------------------------------|
const db = require('../data/db-config.js')
// --------------------------------------------|
// Find all users in database
const find = async () => await db('users')
// --------------------------------------------|
// Find a user by id
const findById = id =>
  db('users')
    .where({ id })
    .first()
// --------------------------------------------|
// find posts by a specified user
const findPosts = id =>
  db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ user_id: id })
// --------------------------------------------|
// Add a new user
const add = user =>
  db('users')
    .insert(user)
    .then(ids => findById(ids[0]))
// --------------------------------------------|
// Update a specified user
const update = (changes, id) =>
  db('users')
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id)
    })
// --------------------------------------------|
// Remove a specified user
const remove = id =>
  db('users')
    .where({ id })
    .del()
// --------------------------------------------|
// EXPORT DB HELPERS
module.exports = { find, findById, findPosts, add, update, remove }
