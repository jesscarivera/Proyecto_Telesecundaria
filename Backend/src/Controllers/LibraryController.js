const Books = require('../Models/Library');

// Crear libro
const agregarLibro = async (req, res) => {
  const { title, author, year_publication, genre, editorial, copies_availables } = req.body;

  try {
    // Verificar si ya existe un libro con el mismo título y autor
    const existe = await Books.findOne({ where: { title, author } });
    if (existe) {
      return res.status(400).json({ mensaje: 'El libro ya está registrado' });
    }

    // Crear nuevo libro
    const book = await Books.create({
      title,
      author,
      year_publication,
      genre,
      editorial,
      copies_availables
    });

    res.status(201).json({
      mensaje: 'Libro creado correctamente',
      libro: book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el libro' });
  }
};

// Obtener todos los libros
const obtenerLibros = async (req, res) => {
  try {
    const libros = await Books.findAll({
      attributes: ['id', 'title', 'author', 'year_publication', 'genre', 'editorial', 'copies_availables']
    });
    res.status(200).json(libros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los libros' });
  }
};

// Obtener libro por ID
const obtenerLibro = async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await Books.findOne({
      where: { id },
      attributes: ['id', 'title', 'author', 'year_publication', 'genre', 'editorial', 'copies_availables']
    });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.status(200).json(libro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};

// Editar libro por ID
const editarLibro = async (req, res) => {
  const { id } = req.params;
  const { title, author, year_publication, genre, editorial, copies_availables } = req.body;

  try {
    const libro = await Books.findOne({ where: { id } });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    await libro.update({
      title: title || libro.title,
      author: author || libro.author,
      year_publication: year_publication || libro.year_publication,
      genre: genre || libro.genre,
      editorial: editorial || libro.editorial,
      copies_availables: copies_availables || libro.copies_availables
    });

    res.status(200).json({
      mensaje: 'Libro actualizado correctamente',
      libro
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
};

// Eliminar libro por ID
const eliminarLibro = async (req, res) => {
  const { id } = req.params;

  try {
    const libro = await Books.findOne({ where: { id } });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.status(200).json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el libro' });
  }
};

module.exports = {
  agregarLibro,
  obtenerLibros,
  obtenerLibro,
  editarLibro,
  eliminarLibro
};
