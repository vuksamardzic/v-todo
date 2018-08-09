import { Todo } from './todo.model';
import merge from 'lodash.merge';

const transformer = todo => {
  return {
    id: todo.id,
    name: todo.name,
    status: todo.status
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

export const todoController = {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
  findTodo
};
