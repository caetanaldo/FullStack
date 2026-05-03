import Notification from "../models/Notification.js";

const notificationController = {
  async getMyNotifications(req, res, next) {
    try {
      const notifications = await Notification.findAll({
        where: { user_id: req.user.id },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  },

  async markAsRead(req, res, next) {
    try {
      await Notification.update(
        { read: true },
        { where: { user_id: req.user.id } }
      );
      return res.status(200).json({ message: "Notificações marcadas como lidas" });
    } catch (error) {
      next(error);
    }
  },

  async markOneAsRead(req, res, next) {
    try {
      const notification = await Notification.findByPk(req.params.id);
      if (!notification) return res.status(404).json({ message: "Notificação não encontrada" });
      await notification.update({ read: true });
      return res.status(200).json({ message: "Notificação marcada como lida" });
    } catch (error) {
      next(error);
    }
  },
};

export default notificationController;