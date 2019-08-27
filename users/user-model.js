const db = require('../data/db-config.js')
// --------------------------------------------|
const find = async () => await db('users')
// --------------------------------------------|
const findById = async id =>
  await db('users')
    .where({ id })
    .first()
// --------------------------------------------|
const findPosts = id =>
  db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ user_id: id })
// --------------------------------------------|
const add = user =>
  db('users')
    .insert(user)
    .then(ids => findById(ids[0]))
// --------------------------------------------|
const update = (changes, id) =>
  db('users')
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id)
    })
// --------------------------------------------|
const remove = id =>
  db('users')
    .where({ id })
    .del()
// --------------------------------------------|
module.exports = { find, findById, findPosts, add, update, remove }
