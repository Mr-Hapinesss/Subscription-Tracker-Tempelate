import Subscription from "../Models/subscriptionSchema.js";

// Fetch all subscriptions -- admin only
export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// get subscription by id -- admin only
export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

// Create a new subscription -- authenticated users only
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ... req.body,
            user: req.user._id,
        })
        res.status(201).json({success: true, data: subscription })
    } catch (error) {
        next();
    }
}

// Get all subscriptions for a user -- authenticated users only
export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.userId) {
            const error = new Error('You are not the owner of this account');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.userId });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// Update a subscription -- authenticated users only
export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401;
            throw error;
        }
        const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (error) {
        next(error);
    }};

// Cancel a subscription -- authenticated users only
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401;
            throw error;
        }
        const cancelledSubscription = await Subscription.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
        res.status(200).json({ success: true, data: cancelledSubscription });

    } catch (error) {
        next(error);
    }
}

// Delete a subscription -- authenticated users only
export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401;
            throw error;
        }

        await Subscription.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });

    } catch (error) {
        next(error);
    }};

// Get upcoming renewals -- authenticated users only
export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const upcomingRenewals = await Subscription.find({
            user: req.user._id,
            nextRenewalDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        });
        res.status(200).json({ success: true, data: upcomingRenewals });
    } catch (error) {
       next(error); 
    }
}