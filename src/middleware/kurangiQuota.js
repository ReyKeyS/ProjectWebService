const { users } = require('../models');

const kurangiQuota = async (req, res, next) => {
  const user = await users.findByPk(req.user.user_id);
  if (user.api_quota > 0) {
    await user.increment({ api_quota: -1 });
  } else return res.status(400).send({ message: "Jatah layananmu telah habis. Ayo berlangganan" })
  next();
};

module.exports = kurangiQuota;