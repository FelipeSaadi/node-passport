import express, { ErrorRequestHandler, urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { router } from './routes/main';
import helmet from 'helmet';
import passport from 'passport';

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

server.use(passport.initialize())

server.use(router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status)
    }
    else {
        res.status(400)
    }

    if (err.message) {
        res.json({ error: err.message })
    }
    else {
        res.json({ error: 'An error has occurred' })
    }
}

server.use(errorHandler)

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
})