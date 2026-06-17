const ReviewDAO = require('../models/ReviewDAO');

exports.getBySachId = async (req, res) => {
    try {
        const maSach = parseInt(req.params.maSach);
        const reviews = await ReviewDAO.getReviewsBySachId(maSach);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { maSach, rating, comment } = req.body;
        const success = await ReviewDAO.addReview(maSach, req.user.id, rating, comment);
        if (success) {
            res.json({ message: 'Review added and pending approval' });
        } else {
            res.status(500).json({ error: 'Failed to add review' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPending = async (req, res) => {
    try {
        const reviews = await ReviewDAO.getAllPendingReviews();
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.approve = async (req, res) => {
    try {
        const reviewId = parseInt(req.params.id);
        const success = await ReviewDAO.approveReview(reviewId);
        if (success) {
            res.json({ message: 'Review approved' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.reject = async (req, res) => {
    try {
        const reviewId = parseInt(req.params.id);
        const success = await ReviewDAO.rejectReview(reviewId);
        if (success) {
            res.json({ message: 'Review rejected' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
