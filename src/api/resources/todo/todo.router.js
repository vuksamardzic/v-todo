import express from 'express';
import merge from 'lodash.merge';
import { Todo } from './todo.model';


export const todoRouter = express.Router();

const transformer = user => {
  return {
    id: user.id,
    name: user.name,
    status: user.status
  };
};

const getTodos = (req, res, next) => {
  Todo.find()
    .then(doc => res.json(doc.map(i => transformer(i))))
    .catch(err => next(err));
};

const createTodo = (req, res, next) => {
  Todo.create(req.body)
    .then(doc => res.json(transformer(doc)))
    .catch(err => next(err));
};

const editTodo = (req, res, next) => {
  merge(req.doc, req.body);
  req.doc.save()
    .then(doc => res.json(transformer(doc)))
    .catch(err => next(err));
};

const deleteTodo = (req, res, next) => {
  req.doc.remove()
    .then(doc => res.json({ message: `Todo [${doc.name}] deleted.` }))
    .catch(err => next(err));
};

const findTodo = (req, res, next, id) => {
  Todo.findById(id)
    .then(doc => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        next(new Error('doc not found'));
      }
    })
    .catch(err => next(err));
};

todoRouter.param('id', findTodo);

todoRouter.route('/')
  .get(getTodos)
  .post(createTodo);

todoRouter.route('/:id')
  .put(editTodo)
  .delete(deleteTodo);


