//import the server we made
const server= require('./api/server');

//define port
const PORT= 5000;

//listen
server.listen(PORT, () => {
  console.log(`\n ** Server running on http://localhost:${PORT} ** \n`);
});