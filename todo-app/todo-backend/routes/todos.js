const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { get, set } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  const currentCount = await get('added_todos');
  const newCount = (parseInt(currentCount) || 0) + 1;
  await set('added_todos', newCount);

  const todo = await Todo.create({
    text: req.body.text,
    done: req.body.done
  })
  res.send(todo);
});

router.get('/statistics', async (req, res) => {
  try {
    const count = await get('added_todos');

    res.json({
      "added_todos": parseInt(count) || 0
    });
  } catch (error) {
    res.status(500).send({ error: "Could not retrieve statistics" });
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()
  res.sendStatus(204);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo); // Implemented
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text
  req.todo.done = req.body.done
  await req.todo.save();
  res.json(req.todo) // Implemented
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
