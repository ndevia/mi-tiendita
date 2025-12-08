const { Planta, Compra, CompraPlanta, sequelize } = require("../models/index");

// vista para Listar todas las compras
exports.index = async (req, res, next) => {
  try {
    const compras = await Compra.findAll({
      order: [["id", "DESC"]],
      raw: true
    });

    res.render("compras/index", { compras });
  } catch (error) {
    next(error);
  }
};

// vista para ver el detalle de una compra
exports.show = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    // validar que el id sea de tipo numérico
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).render("error", {
        status: 400, message: "El id no es válido"
      });
    }

    const compra = await Compra.findByPk(id, { 
      include: [
        {
          model: CompraPlanta,
          as: "comprasPlanta",
          include: [
           { model: Planta, as: "planta" }
          ]
        }
      ] 
    });

    // validar que exista una compra con el id ingresado
    if (!compra) {
      return res.status(404).render("error", {
        status: 404, message: "Compra no encontrada"
      });    
    }
    
    const compraTextoPlano = compra.get({ plain: true });
    res.render("compras/show", { compra: compraTextoPlano });
  } catch (error) {
    next(error);
  }
};

// Formulario para generar una compra
exports.new = async (req, res, next) => {
  try {
    const plantas = await Planta.findAll({
      where: { disponible: true },
      order: [["id", "ASC"]],
      raw: true
    });

    res.render("compras/new", { plantas });
  } catch (error) {
    next(error);
  }
};


// Crear una compra
exports.create = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const cantidades = req.body;

    const plantas = await Planta.findAll({ transaction: t });
    let total = 0;
    const items = [];

    // Procesar cada planta
    for (const planta of plantas) {
      const cantidadComprada = parseInt(cantidades[planta.id]);
      
      if (!cantidadComprada || cantidadComprada <= 0) {
        continue;
      }

      // Si no hay stock suficiente
      if (cantidadComprada > planta.cantidad) {
        await t.rollback();
        return res.status(400).render("error", {
          status: 400,
          message: `No hay suficiente stock de ${planta.genero} ${planta.especie}.`
        });
      }

      // Calcular subtotal
      const subtotal = planta.precio * cantidadComprada;
      total += subtotal;

      items.push({
        plantaId: planta.id,
        cantidad: cantidadComprada,
        precioUnitario: planta.precio,
        subtotal
      });
    }

    if (items.length === 0) {
      await t.rollback();
      return res.status(400).render("error", {
        status: 400,
        message: "Debes seleccionar al menos una planta con cantidad mayor a 0."
      });
    }

    // Crear compra
    const compra = await Compra.create({ total }, { transaction: t });

    // Crear items
    for (const item of items) {
      await CompraPlanta.create({
        compraId: compra.id,
        plantaId: item.plantaId,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        subtotal: item.subtotal
      }, { transaction: t });

      // Restar stock
      const planta = plantas.find(p => p.id === item.plantaId);
      const nuevaCantidad = planta.cantidad - item.cantidad;

      await planta.update({
        cantidad: nuevaCantidad,
        disponible: nuevaCantidad > 0 ? true : false
      }, { transaction: t });
    }

    await t.commit();
    res.redirect("/compras");
  } catch (error) {
    await t.rollback();
    next(error);
  }
};