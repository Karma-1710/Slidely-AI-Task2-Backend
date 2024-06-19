import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;
const dbFile = 'db.json';

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello")
});

app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newEntry = { name, email, phone, github_link, stopwatch_time };
    console.log(newEntry);
    let data = [];
    if (fs.existsSync(dbFile)) {
        data = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    }
    data.push(newEntry);
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
    res.send({ success: true });
});

app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);
    if (isNaN(index)) {
        return res.status(400).send({ error: 'Invalid index' });
    }

    if (!fs.existsSync(dbFile)) {
        return res.status(404).send({ error: 'No submissions found' });
    }

    const data = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    if (index < 0 || index >= data.length) {
        return res.status(404).send({ error: 'Index out of range' });
    }

    res.send(data[index]);
});

app.delete('/delete', (req: Request, res:Response) => {
    const index = parseInt(req.query.index as string, 10);
    if (isNaN(index)) {
        return res.status(400).send({ error: 'Invalid index' });
    }

    if (!fs.existsSync(dbFile)) {
        return res.status(404).send({ error: 'No submissions found' });
    }

    let data = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

    if (index < 0 || index >= data.length) {
        return res.status(404).send({ error: 'Index out of range' });
    }

    data.splice(index, 1);
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
    res.send({ message: 'Submission deleted successfully' });
});

app.get('/readAll', (req: Request, res: Response) => {
    if (!fs.existsSync(dbFile)) {
        return res.status(404).send({ error: 'No submissions found' });
    }

    const data = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    res.send(data);
});

app.put('/update', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (isNaN(index)) {
        return res.status(400).send({ error: 'Invalid index' });
    }

    if (!fs.existsSync(dbFile)) {
        return res.status(404).send({ error: 'No submissions found' });
    }

    let data = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

    if (index < 0 || index >= data.length) {
        return res.status(404).send({ error: 'Index out of range' });
    }

    data[index] = { name, email, phone, github_link, stopwatch_time };
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

    res.send({ message: 'Submission updated successfully' });
});

app.get('/search', (req: Request, res: Response) => {
    const email = req.query.email as string;
    console.log(email);
    if (!email) {
      return res.status(400).send({ error: 'Email parameter is required' });
    }
  
    if (!fs.existsSync(dbFile)) {
      return res.status(404).send({ error: 'No submissions found' });
    }
  
    try {
      const data: Submission[] = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
      console.log(data);
      const submission = data.find(sub => sub.email === email);
  
      if (submission) {
        res.send(submission);
      } else {
        res.status(404).send({ error: 'Submission not found' });
      }
    } catch (err) {
      console.error('Error searching submission:', err);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});