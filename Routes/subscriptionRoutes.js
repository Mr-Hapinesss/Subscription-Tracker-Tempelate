import { Router } from 'express';
import authorize from '../Middleware/authorisationMiddleware.js';
import { 
    createSubscription, 
    getUserSubscriptions, 
    getSubscriptions, 
    getSubscriptionById, 
    updateSubscription, 
    cancelSubscription,
    getUpcomingRenewals, 
    deleteSubscription } from '../Contoller/subController.js';

const subscriptionRouter = Router();


subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id', getSubscriptionById);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('/upcoming-renewals', getUpcomingRenewals);


export default subscriptionRouter;