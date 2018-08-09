import express from 'express';
import { todoController } from './todo.controller';

export const todoRouter = express.Router();

todoRouter.param('id', todoController.findTodo);

todoRouter.route('/')
  .get(todoController.getTodos)
  .post(todoController.createTodo);

todoRouter.route('/:id')
  .put(todoController.editTodo)
  .delete(todoController.deleteTodo);


