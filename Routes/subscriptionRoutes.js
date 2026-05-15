import { Router } from 'express';
import authorize from '../Middleware/authorisationMiddleware.js';
import { createSubscription, getUserSubscriptions } from '../Contoller/subController.js';

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
    res.send({"title": "GET all subscriptions"});
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({});
})


subscriptionRouter.post('/', authorize, createSubscription);


subscriptionRouter.put('/:id', (req, res) => {
    res.send({});
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({});
})

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({});
})


subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({});
})



export default subscriptionRouter;