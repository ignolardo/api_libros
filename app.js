import express from 'express';

const app = express();
const port = 3000;

// Routes
import librosRouter from './routes/libros.js';

// Error Handler
import errorHandler from './middlewares/errorHandler.js';

app.use(express.json());
app.use('/libros', librosRouter);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Server listen on port: ${port}`);
})