import * as express from 'express';
import * as bodyParser from 'body-parser';
import Pessoa from './pessoa.class';

export default class Rest {
	private static instance = null;	
	private express;

	constructor () {
		if (Rest.instance == null) {
			this.express = express();
			this.express.use( this.headerContent );
			this.express.get( "/pessoa", this.getPessoa );
			this.express.post( "/pessoa", this.postPessoa );
			Rest.instance = this;
		}

		return Rest.instance;
	}

	private headerContent (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		bodyParser.urlencoded({ extended: true });
		next();
	}

	private getPessoa (req, res) {
		if(typeof req.query.id == "undefined"){
			var rPessoas = Pessoa.listar();
			var pessoasTxt = JSON.stringify( rPessoas );
			res.send( pessoasTxt );
		}else{
			var pessoa = Pessoa.buscar( req.query.id );
			var json = JSON.stringify( pessoa.dados );
			res.send(json);
		}
	}

	private postPessoa (req, res) {
		var date = new Date(req.body.dataNasc);
		var pessoa = Pessoa.cadastrar(req.body.nome, req.body.cpf, date);
		var text = JSON.stringify(pessoa.dados);
		res.send(text);
	}

	get expressInstance () {
		return this.express;
	}
}