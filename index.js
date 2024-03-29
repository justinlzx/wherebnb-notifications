import express from 'express';
import cors from 'cors';
import { startConsumer } from './service/consumer.js'
import dotenv from 'dotenv'

dotenv.config()

console.log("starting consumer from index.js")
startConsumer()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ENV = process.env



