// import Pessoa from './classes/pessoa.class';

// var x = "Assassinhora!";

// Pessoa.testeMySQL().then(
// 	function(rows){
// 		x = rows;
// 	}, 

// 	function(err){
// 		throw err;
// 	}
// );


// setTimeout(function() {
// 	console.log(x);
// }, 10 * 1000);

// console.log(x);

import * as http from 'http';
import * as WebSocket from 'ws';
import Rest from './classes/rest.class';

const WebSocketServer = WebSocket.Server;
const httpServer = http.createServer();
const wss = new WebSocketServer({server: httpServer});
const rest = new Rest();

(<any>wss).broadcast = function(data) {
  wss.clients.forEach( (client) => {
    client.send(data);
  });
};

wss.on('connection', (conexaoAtual) => {
	conexaoAtual.send('Conexão estabelecida!');
	conexaoAtual.on('message', (message) => {
		wss.broadcast(message);
	});
});

httpServer.on("request", rest.expressInstance);

httpServer.listen("8080", () => {
	console.log('Ouvindio em ' + httpServer.address().port)
});