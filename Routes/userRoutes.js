import { Router } from 'express';
import { getUser, getUsers } from '../Contoller/userController.js';
import authorize from '../Middleware/authorisationMiddleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
    res.send({});
} );

userRouter.put('/:id', (req, res) => {
    res.send({});
} );

userRouter.delete('/:id', (req, res) => {
    res.send({});
} );

export default userRouter;
