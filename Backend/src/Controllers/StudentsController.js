const Student = require('../Models/Students');

// Crear estudiante
const agregarEstudiante = async (req, res) => {
  const { name, Last_Name, enrollment, age, grade, group } = req.body;

  try {
    // Verificar si ya existe un estudiante con esa matrícula
    const existe = await Student.findOne({ where: { enrollment } });
    if (existe) {
      return res.status(400).json({ mensaje: 'La matrícula ya está registrada' });
    }

    // Crear nuevo estudiante
    const student = await Student.create({
      name,
      Last_Name,
      enrollment,
      age,
      grade,
      group
    });

    res.status(201).json({
      mensaje: 'Estudiante creado correctamente',
      estudiante: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear estudiante' });
  }
};

// Obtener todos los estudiantes
const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Student.findAll({
      attributes: ['name', 'Last_Name', 'enrollment', 'age', 'grade', 'group']
    });
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los estudiantes' });
  }
};

// Obtener estudiante por matrícula
const obtenerEstudiante = async (req, res) => {
  const { enrollment } = req.params;

  try {
    const estudiante = await Student.findOne({
      where: { enrollment },
      attributes: ['name', 'Last_Name', 'enrollment', 'age', 'grade', 'group']
    });

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el estudiante' });
  }
};

// Editar estudiante por matrícula
const editarEstudiante = async (req, res) => {
  const { enrollment } = req.params;
  const { name, Last_Name, age, grade, group } = req.body;

  try {
    const estudiante = await Student.findOne({ where: { enrollment } });

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    await estudiante.update({
      name: name || estudiante.name,
      Last_Name: Last_Name || estudiante.Last_Name,
      age: age || estudiante.age,
      grade: grade || estudiante.grade,
      group: group || estudiante.group
    });

    res.status(200).json({
      mensaje: 'Estudiante actualizado correctamente',
      estudiante
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el estudiante' });
  }
};

// Eliminar estudiante por matrícula
const eliminarEstudiante = async (req, res) => {
  const { enrollment } = req.params;

  try {
    const estudiante = await Student.findOne({ where: { enrollment } });

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    await estudiante.destroy();
    res.status(200).json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el estudiante' });
  }
};

module.exports = {
  agregarEstudiante,
  obtenerEstudiantes,
  obtenerEstudiante,
  editarEstudiante,
  eliminarEstudiante
};
