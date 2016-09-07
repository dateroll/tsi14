import Pessoa from './classes/pessoa.class';

Pessoa.testeMySQL();

// import * as http from 'http';
// import * as WebSocket from 'ws';
// import Rest from './classes/rest.class';

// const WebSocketServer = WebSocket.Server;
// const httpServer = http.createServer();
// const wss = new WebSocketServer({server: httpServer});
// const rest = new Rest();





// wss.on('connection', (conexaoAtual) => {
//   conexaoAtual.send('Conexão estabelecida!');
//   conexaoAtual.on('message', (message) => {
//   	console.log(message.toString());
//     conexaoAtual.send( message.toString().toUpperCase() + "!!!" );
//   });
// });


// (<any>wss).broadcast = function(data){
//   wss.clients.forEach( (client) => {
//     client.send(data);
//   });
// };






// httpServer.on("request", rest.expressInstance);

// httpServer.listen("8080", () => {
// 	console.log('Ouvindio em ' + httpServer.address().port)
// });