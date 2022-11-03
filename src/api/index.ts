import express from 'express';
import api from './v1/api';

const app = express();

app.use('/api/v1', api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Started on: http://localhost:${PORT}`);
});
