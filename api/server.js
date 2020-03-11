//import express
const express= require('express');
const cors= require('cors');

//import router
const postsRouter= require('../posts/postsRouter');

//define server
const server= express();

//use middleware
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`
  <h1>Welcome to our Posts-Data Server</h1>
  `)
});

//assign posts router
server.use('/api/posts', postsRouter);

//export
module.exports= server;


