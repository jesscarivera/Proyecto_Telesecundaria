const Category = require('../Models/Category')

// Crear una nueva categoría
const createCategory = async (req, res) => {
  const { name, type, description } = req.body;

  try {
    const category = await Category.create({ name, type, description });
    res.status(201).json({ message: 'Categoría creada', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear categoría', error: error.message });
  }
};

// Obtener todas las categorías (opcionalmente filtradas por tipo)
const getCategories = async (req, res) => {
  const { type } = req.query;

  try {
    const where = type ? { type } : {};
    const categories = await Category.findAll({ where });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type, description } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    await category.update({ name, type, description });
    res.status(200).json({ message: 'Categoría actualizada', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });

    await category.destroy();
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
