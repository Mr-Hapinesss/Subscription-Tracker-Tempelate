import { Router } from 'express';

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
    res.send({"title": "GET all subscriptions"});
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({});
})


subscriptionRouter.post('/', (req, res) => {
    res.send({});
})


subscriptionRouter.put('/:id', (req, res) => {
    res.send({});
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({});
})

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({});
})

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({});
})


subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({});
})



export default subscriptionRouter;