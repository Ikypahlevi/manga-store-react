const NotificationDAO = require('../models/NotificationDAO');

exports.getUnread = async (req, res) => {
    try {
        const notifications = await NotificationDAO.getUnreadNotifications(req.user.id);
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await NotificationDAO.markAsRead(id);
        res.json({ message: 'Marked as read' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
