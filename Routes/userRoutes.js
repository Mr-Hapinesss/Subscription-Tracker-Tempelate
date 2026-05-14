import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({});
} );

userRouter.get('/:id', (req, res) => {
    res.send({});
} );

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