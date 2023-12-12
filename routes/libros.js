import express from "express";
import Joi from "joi";
const router = express.Router();
import libros from '../data.js';

const libroSchema = Joi.object({
  titulo: Joi.string().required().label("Titulo"),
  autor: Joi.string().required().label("Autor"),
});

router.get('/', (req,res,next)=>{
  try {
    res.json(libros);
  } catch (err) {
    next(err);
  }
}); 

router.get('/:id', (req,res,next)=>{

  try {
    
    const id = req.params.id;
    const libro = libros.find(l=>l.id === id);

    if (!libro) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    res.json(libro);

  } catch (err) {
    next(err);
  }

});

router.post('/', (req,res,next)=>{

  try {
    
    const {err,value} = libroSchema.validate(req.body);
    if (err) {
      const validationError = new Error('Error de validación');
      validationError.status = 400;
      validationError.details = err.details.map(detail => detail.message);
      throw validationError;
    }

    const {titulo, autor} = value;

    const nuevoLibro = {
      id: (libros.length + 1).toString(),
      titulo,
      autor,
    }

    libros.push(nuevoLibro);

    res.status(201).json(nuevoLibro);

  } catch (err) {
    next(err);
  }

});

router.put('/:id', (req,res,next)=>{
  try {

    const id = req.params.id;
    const { err, value } = libroSchema.validate(req.body);

    if (err) {
      const validationError = new Error('Error de validación');
      validationError.status = 400;
      validationError.details = err.details.map(detail => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;
    const libro = libros.find(l => l.id === id);

    if (!libro) {
      const error = new Error('Libro no encontrado');
      error.status = 404;
      throw error;
    }

    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;

    res.json(libro);

  } catch (err) {
    next(err);
  }

});

router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
      const error = new Error('Libro no encontrado');
      error.status = 404;
      throw error;
    }

    const libroEliminado = libros.splice(index, 1);
    res.json(libroEliminado[0]);

  } catch (err) {
    next(err);
  }
});

export default router;