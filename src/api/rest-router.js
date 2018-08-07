import express from 'express';
import { apiErrorHandler } from './modules/error-handler';
import { todoRouter } from './resources/todo/todo.router';


export const restRouter = express.Router({});

restRouter.use('/todo', todoRouter);
restRouter.use(apiErrorHandler);
