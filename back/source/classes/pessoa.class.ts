import * as fs from 'fs';
import * as MySQL  from 'mysql';

export default class Pessoa{
	static filedata = `${__dirname}/../../data/pessoa.json`;  

	static testeMySQL() {
		var connection = MySQL.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'chat'
		});
		connection.connect();
		connection.query(
			'SELECT * FROM pessoa WHERE 1', 
			function(err, rows, fields) {
				if (err) throw err;
				console.log(rows);
			}
		);
		connection.end();
	}

	constructor(
		public _nome: string, 
		private _cpf: string, 
		private _dataNasc: Date
	){
		// lets rock
	}

	static cadastrar(paramNome: string, paramCpf: string, paramDataNasc: Date): Pessoa{
		let arquivoTxt = fs.readFileSync(Pessoa.filedata).toString();

		let arquivoJson = JSON.parse( arquivoTxt );
		
		let novaPessoa = {
			nome     : paramNome,
			cpf      : paramCpf,
			dataNasc : paramDataNasc
		};

		arquivoJson.push( novaPessoa );

		arquivoTxt = JSON.stringify( arquivoJson );

		fs.writeFileSync(Pessoa.filedata, arquivoTxt);

		return new this(paramNome, paramCpf, paramDataNasc);
	}

	static buscar(id: number): Pessoa{
		let arquivoTxt = fs.readFileSync(Pessoa.filedata).toString();

		let arquivoJson = JSON.parse( arquivoTxt );

		let pessoa = arquivoJson[ id ];

		if(typeof pessoa == "undefined"){
			return null;
		}else{
			return new this(pessoa.nome, pessoa.cpf, pessoa.dataNasc);
		}
	}

	static listar(){
		let arquivoTxt = fs.readFileSync(Pessoa.filedata).toString();
		let arquivoJson = JSON.parse( arquivoTxt );
		return arquivoJson;
	}

	get nome(){
		return this._nome;
	}

	get dados(){
		return {
			nome: this._nome,
			cpf: this._cpf,
			dataNasc: this._dataNasc
		};
	}
}

// var pessoa1 = Pessoa.buscar(2);
// if(pessoa1 !== null){
// 	console.log(pessoa1.nome);	
// }else{
// 	console.error("Pessoa não encontrada");
// }

