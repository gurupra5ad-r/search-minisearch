import express from 'express';
import cors from 'cors';
import { buildIndex } from './etl.js';

const app = express();
app.use(cors());
const ms = buildIndex();

app.get('/search', (req,res)=>{
  const q = (req.query.q||'').toString();
  const out = q ? ms.search(q, { prefix: true }) : [];
  res.json(out);
});

app.listen(3002, ()=> console.log('search on http://localhost:3002'));
