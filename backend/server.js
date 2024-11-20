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

let wordOfTheDay = '';
let dateSet = '';

const generateWordOfTheDay = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  wordOfTheDay = words[randomIndex];
  dateSet = new Date().toISOString().split('T')[0]; // Store today's date
};

app.get('/api/word-of-the-day', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date

  if (dateSet !== today) {
    generateWordOfTheDay(); // Generate a new word if a new day has started
  }

  res.json({ word: wordOfTheDay }); // Send the word of the day
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors({
    origin: ['http://localhost:5173/', 'https://your-render-url.com/'],
  }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));


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

startApolloServer();