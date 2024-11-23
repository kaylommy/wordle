const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
require('dotenv').config();
const cors = require('cors');
const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");
const words = require("./words.json");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors({
    origin: 'http://localhost:5173',  // Ensure this matches the frontend's URL
    methods: ['GET', 'POST'],        // Optional: specify allowed methods
    allowedHeaders: ['Content-Type'], // Optional: specify allowed headers
  }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  app.get('/test-cors', (req, res) => {
    res.json({ message: "CORS is working!" });
  });


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

let wordOfTheDay = '';
let dateSet = '';
let usedWords = new Set();

const generateWordOfTheDay = () => {
  let newWord = '';
  do {
    const randomIndex = Math.floor(Math.random() * words.length);
    newWord = words[randomIndex];
  } while (usedWords.has(newWord));

  wordOfTheDay = newWord;
  dateSet = new Date().toISOString().split('T')[0];
  usedWords.add(newWord);

  if (usedWords.size > words.length / 2) {
    usedWords.clear();
    usedWords.add(newWord);
  }
  console.log(`Generated word of the day: ${wordOfTheDay}`);
};

app.get('/api/word-of-the-day', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; 

  if (dateSet !== today) {
    generateWordOfTheDay(); 
  }

  res.json({ word: wordOfTheDay }); 
});

 

startApolloServer();