import express from 'express';
import dishout from './v1/dishout';
import station from './v1/station';

const app = express();

app.use('/api/v1/dishout', dishout);
app.use('/api/v1/station', station);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Started on: http://localhost:${PORT}`);
});
