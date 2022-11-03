import express from 'express';

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));

app.get('/', (req, res) => {
  return res.send(`distdance-api commit: ${process.env.RAILWAY_GIT_COMMIT_SHA?.substring(0, 7) ?? 'LOCAL'}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Started on: http://localhost:${PORT}`);
});
