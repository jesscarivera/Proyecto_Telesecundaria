const InventoryItem = require('../Models/Inventory');
const Category = require('../Models/Category');

// Crear un nuevo item de inventario
const createItem = async (req, res) => {
  const { item_name, description, quantity, unit, location, category_id } = req.body;

  try {
    const category = await Category.findByPk(category_id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    const item = await InventoryItem.create({
      item_name,
      description,
      quantity,
      unit,
      location,
      category_id
    });

    res.status(201).json({ message: 'Item creado', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el item', error: error.message });
  }
};

// Obtener todos los items de inventario (opcionalmente filtrados por categoría)
const getItems = async (req, res) => {
  const { category_id } = req.query;

  try {
    const where = category_id ? { category_id } : {};
    const items = await InventoryItem.findAll({
      where,
      include: { model: Category, as: 'category', attributes: ['name', 'type'] }
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener items', error: error.message });
  }
};

// Actualizar un item de inventario
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { item_name, description, quantity, unit, location, category_id } = req.body;

  try {
    const item = await InventoryItem.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item no encontrado' });

    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    await item.update({ item_name, description, quantity, unit, location, category_id });
    res.status(200).json({ message: 'Item actualizado', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar item', error: error.message });
  }
};

// Eliminar un item de inventario
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await InventoryItem.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item no encontrado' });

    await item.destroy();
    res.status(200).json({ message: 'Item eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar item', error: error.message });
  }
};

//  Obtener items por categoría
const getItemsByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const items = await InventoryItem.findAll({
      where: { category_id: id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name', 'type']
      }
    });

    if (!items.length) {
      return res.status(404).json({ message: 'No se encontraron items para esta categoría' });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener los items por categoría',
      error: error.message
    });
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getItemsByCategory
};
