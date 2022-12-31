import { errorSchema, responseSchema } from "./schemas";

export const paths = {

	"/user/create": {
		post: {
			tags: [ "Usuário" ],
			summary: "Faz a criação de um usuário",
			parameters: [
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							email: {
								type: "string"
							},
		
							name: {
								type: "string"
							},
		
							password: {
								type: "string"
							},
		
							passwordConfirm: {
								type: "string"
							}
						}
					}
				},
			],
			responses: {
				
				201: {
					description: "Sucesso na criação",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/verify-email": {
		post: {
			tags: [ "Usuário" ],
			summary: "Faz a confirmação de que e-mail do usuário existe",
			parameters: [  
				{
					in: "query",
					name: "email",
					required: true
				},

				{
					in: "query",
					name: "token",
					required: true
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na confirmação do e-mail",
					schema: responseSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/user/login": {
		post: {
			tags: [ "Usuário" ],
			summary: "Faz o login do usuário",
			parameters: [  
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							email: {
								type: "string"
							},
							
							password: {
								type: "string"
							},	
						}
					}
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na autentificação do usuário",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/refresh-token": {
		post: {
			tags: [ "Usuário" ],
			summary: "Faz o retorno de um access token",
			parameters: [  
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							refreshToken: {
								type: "string"
							}
						}
					}
				},
			],
			responses: {
				
				200: {
					description: "Sucesso no retorno",
					schema: responseSchema
				},
	
				401: {
					description: "Erro de Autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/user/password/send-token-password-recover": {
		post: {
			tags: [ "Usuário" ],
			summary: "Faz o envio do link de recuperação de senha do usuário",
			parameters: [  
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							email: {
								type: "string"
							}
						}
					}
				},
			],
			responses: {
				
				200: {
					description: "Sucesso no envio do link",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/user/password/password-recover": {
		patch: {
			tags: [ "Usuário" ],
			summary: "Faz a recuperação da senha do usuário",
			parameters: [  
				{
					in: "query",
					name: "email",
					required: true,
				},

				{
					in: "query",
					name: "token",
					required: true,
				},
	
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							password: {
								type: "string"
							},
							
							passwordConfirm: {
								type: "string"
							},
						}
					},
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na recuperação da senha",
					schema: responseSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/user/email/send-token-update-email": {
		post: {
			tags: [ "Usuário" ],
			summary: "Faz o envio do link de confirmação de atualização de email",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
				
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							email: {
								type: "string"
							}
						}
					}
				},
			],
			responses: {
				
				200: {
					description: "Sucesso no envio do link",
					schema: responseSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/update-email": {
		patch: {
			tags: [ "Usuário" ],
			summary: "Faz a confirmação da atualização do e-mail",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
				
				{
					in: "query",
					name: "email",
					required: true,
				},

				{
					in: "query",
					name: "token",
					required: true,
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na confirmação da atualização do e-mail",
					schema: responseSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/user/password/update": {
		patch: {
			tags: [ "Usuário" ],
			summary: "Faz a atualização da senha do usuário",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
				
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							passwordCurrent: {
								type: "string"
							},
							
							password: {
								type: "string"
							},
		
							passwordConfirm: {
								type: "string"
							},
						}
					},
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na atualização da senha do usuário",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/update-name": {
		patch: {
			tags: [ "Usuário" ],
			summary: "Faz a atualização do nome do usuário",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
				
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							name: {
								type: "string"
							},
						}
					},
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na atualização do nome",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/get-name": {
		get: {
			tags: [ "Usuário" ],
			summary: "Faz o retorno do nome do usuário",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
	
			],
			responses: {
				
				200: {
					description: "Sucesso no retorno do nome usuário",
					schema: responseSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/user/delete": {
		delete: {
			tags: [ "Usuário" ],
			summary: "Faz a exclusão do usuário",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
				
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							password: {
								type: "string"
							},
		
							passwordConfirm: {
								type: "string"
							},
						}
					},
				},
			],
			responses: {
				
				200: {
					description: "Sucesso na exclusão do usuário",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/room": {
		post: {
			tags: [ "Sala" ],
			summary: "Faz a criação de uma sala",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
	
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							name: {
								type: "string"
							},
						}
					},
				},
	
			],
			responses: {
				201: {
					description: "Sucesso na criação da sala",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
	},

	"/room-code": {
		get: {
			tags: [ "Sala" ],
			summary: "Faz o retorno do código da sala do usuário",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
			],
			responses: {
				200: {
					description: "Sucesso no retorno do código da sala do usuário",
					schema: responseSchema
				},


				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
	},

	"/room/{roomCode}": {
		get: {
			tags: [ "Sala" ],
			summary: "Faz o retorno de uma sala",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},

				{
					in: "path",
					name: "roomCode",
					required: true
				},
			],
			responses: {
				200: {
					description: "Sucesso no retorno da sala",
					schema: {
						type: "object",
						properties: {
							id: {
								type: "string"
							},

							user_id: {
								type: "string"
							},

							code: {
								type: "string"
							},

							name: {
								type: "string"
							},

							createad_at: {
								type: "string"
							},

							updated_at: {
								type: "string"
							},
						}
					}
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
		
		delete: {
			tags: [ "Sala" ],
			summary: "Faz a exclusão de uma sala",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
	
				{
					in: "path",
					name: "roomCode",
					required: true
				},
	
			],
			responses: {
				200: {
					description: "Sucesso na exclusão da sala",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		}
	},

	"/question/{roomCode}": {
		post: {
			tags: [ "Pergunta" ],
			summary: "Faz a criação de uma pergunta",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},

				{
					in: "path",
					name: "roomCode",
					required: true,
					description: "Código da Sala",
				},
	
				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							question: {
								type: "string"
							},
						}
					},
				},
	
			],
			responses: {
				201: {
					description: "Sucesso na criação da pergunta",
					schema: responseSchema
				},
	
				400: {
					description: "Erro do usuário",
					schema: errorSchema
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},

		get: {
			tags: [ "Pergunta" ],
			summary: "Faz o retorno das perguntas de uma sala",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},

				{
					in: "path",
					name: "roomCode",
					required: true,
					description: "Código da Sala",
				},
	
			],
			responses: {
				200: {
					description: "Sucesso no retorno das perguntas de uma sala",
					schema: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: {
									type: "string"
								},
	
								userId: {
									type: "string"
								},
	
								question: {
									type: "string"
								},
	
								response: {
									type: "string"
								}
							}
						}
					}
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
	},

	"/question": {
		get: {
			tags: [ "Pergunta" ],
			summary: "Faz o retorno das perguntas feitas pelo usuário",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},
	
			],
			responses: {
				200: {
					description: "Sucesso no retorno das perguntas do usuário",
					schema: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: {
									type: "string"
								},
	
								userId: {
									type: "string"
								},
	
								question: {
									type: "string"
								},
	
								response: {
									type: "string"
								}
							}
						}
					}
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
	},

	"/question/{questionId}": {
		delete: {
			tags: [ "Pergunta" ],
			summary: "Faz a exclusão de uma pergunta",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},

				{
					in: "path",
					name: "questionId",
					required: true,
					description: "Id da pergunta",
				},
			],
			responses: {
				201: {
					description: "Sucesso na exclusão da pergunta",
					schema: responseSchema
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
	},

	"/response/{roomCode}/{questionId}": {
		post: {
			tags: [ "Resposta" ],
			summary: "Faz a criação de uma resposta",
			parameters: [
				{
					in: "header",
					name: "Authorization",
					required: true,
					description: "Token de Autentificação",
					example: "Bearer token"
				},

				{
					in: "path",
					name: "roomCode",
					required: true,
					description: "Código da Sala",
				},

				{
					in: "path",
					name: "questionId",
					required: true,
					description: "Id da pergunta",
				},

				{
					in: "body",
					name: "body",
					required: true,
					schema: {
						type: "object",
						properties: {
							response: {
								type: "string"
							},
						}
					},
				},
			],
			responses: {
				201: {
					description: "Sucesso na criação da resposta",
					schema: responseSchema
				},

				401: {
					description: "Erro de autorização",
					schema: errorSchema
				},
	
				500: {
					description: "Erro no servidor",
					schema: errorSchema
				}
			}
		},
	},
};