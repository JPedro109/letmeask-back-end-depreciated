import { paths } from "./paths";

const swaggerJSON = {
	swagger: "2.0",
	info: {
		title: "Api de interação de usuários por meio de salas de perguntas e respostas",
		description: "Aplicação que faz da  interação de usuários por meio de salas de perguntas e respostas",
		version: "1.0",
	},
	produces: [
		"application/json"
	],
	tags: [
		{
			name: "Usuário",
			description: "Rotas relacionadas ao usuário"
		},

		{
			name: "Sala",
			description: "Rotas relacionadas a sala"
		},

		{
			name: "Pergunta",
			description: "Rotas relacionadas a questão"
		},

		{
			name: "Resposta",
			description: "Rotas relacionadas a resposta"
		},
	],
	paths 
};

export default swaggerJSON;