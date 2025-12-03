const { Planta } = require("../models/index");

exports.index = async (req, res, next) => {
  try {
    const plantas = await Planta.findAll({
      order: [['id', 'ASC']],
      raw: true
    });
      
    res.render("plantas/index", { plantas })
  } catch (error) {
    next(error)
  }
} 