<h1> ☁️ <strong>Conversas 1:1</strong></h1>

<h2>📜 <strong>Descrição do projeto</strong></h2>
A API de Conversas 1:1 é um serviço de agendamento de conversas entre duas pessoas que estejam cadastradas na plataforma. Um usuário pode encontrar qualquer usuário dentro da plataforma e agendar uma reunião. <br>
Em cada reunião (one one) é possível adicionar diversos pontos de interesse (talking points) para saber sobre o que vai ter na reunião e também é possível inserir anotações (notes) sobre os pontos discutidos.
<hr/><br>

<h2>⚙️ <strong>Sobre as tecnologias e bibliotecas</strong></h2>
Este projeto foi desenvolvido utilizando o framework Express.js em conjunto com diversas bibliotecas e tecnologias para proporcionar uma experiência eficiente e segura. Abaixo estão listadas as principais bibliotecas utilizadas:

- Express.js (v4.18.2)
- TypeScript (v5.1.6)
- TypeORM (v0.3.17)
- Cors (v2.8.5)
- Dotenv (v16.3.1)
- jsonwebtoken (v9.0.1)
- bcryptjs (v2.4.3)
- cloudinary (v1.39.0)
- multer (v1.4.5-lts.1)
- pg (v8.11.1)
- reflect-metadata (v0.1.13)
- zod (v3.21.4)

Uma biblioteca de validação de esquemas em TypeScript, utilizada para validar dados de entrada.
Além dessas, outras bibliotecas foram utilizadas para aprimorar a funcionalidade e a segurança do projeto. Certifique-se de verificar a documentação oficial de cada biblioteca para obter informações detalhadas sobre seu uso e configuração.

<h2>🗺️ <strong>Rotas da Aplicação</strong></h2><br>
O projeto conta com 5 end points que são login, users, one one, talking points e notes. <br>
✔️ Um user pode criar uma one one com talking points e notes, ou uma one one com talking points ou até mesmo uma one one vazia sem talking points. Todas as ações devem ser feitas com usuário logado e com token válido.<br>
❌ Não se pode criar um talking point ou uma nota se não tiver uma one one para elas pertencerem. As ações não funcionam se o usuário não estiver logado e com token válido.

<h2><strong>/login</strong></h2>
<h3><strong>Entrar na plataforma</strong></h3>

```bash
# POST - /login - FORMATO DA REQUISIÇÃO
{	
	"email": "bart@mail.com",
	"password": "12345678"	
}

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMDMxMWIxM2MtYzYwNS00YzBmLWEwZjktMDdiOWM3NWQ3OTEwIiwiaWF0IjoxNzA1OTUyMjk4LCJleHAiOjE3MDYwMzg2OTgsInN1YiI6IjAzMTFiMTNjLWM2MDUtNGMwZi1hMGY5LTA3YjljNzVkNzkxMCJ9.RsUAd9Z6gNcfLN4dT9P0kIpHT_RJPC3p6HAJar1BqoA"
}
```
<hr/><br/>

<h2>/users</h2>
<h3><strong>Criar usuário</strong></h3>

```bash
# POST - /users - FORMATO DA REQUISIÇÃO
{
	"name": "Bart",
	"email": "bart@mail.com",
	"password": "12345678"	
}

# FORMATO DA RESPOSTA - STATUS 201 Created
{
	"name": "Bart",
	"email": "bart@mail.com",
	"uuid": "d1c35934-2aa4-4354-91af-ac679811e86b",
	"profileImage": null
}
```
<hr/>

<h2><strong>/users</strong></h2>
<h3><strong>Todos usuários</strong></h3>

```bash
# GET - /users - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 200 OK
[
	{
		"name": "Bart Simpsom",
		"email": "bart@mail.com",
		"uuid": "0311b13c-c605-4c0f-a0f9-07b9c75d7910",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690390946/esexeaxxi9vfdltioupt.jpg",
		"one_one_organizer": [
			{
				"title": "Editando",
				"date": "2023-08-08",
				"hour": "00:00:00",
				"done": false
			},
			{
				"title": "Atualizando 6",
				"date": "2023-08-08",
				"hour": "16:56:00",
				"done": true
			}
		],
		"one_one_guest": []
	},
	{
		"name": "Samir Dourado",
		"email": "samir@mail.com",
		"uuid": "0ab535bb-3329-44ab-b6bc-26cb103843ac",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690391342/vn8aloy7xhmxuhbgetmk.jpg",
		"one_one_organizer": [],
		"one_one_guest": [
			{
				"title": "Atualizando 6",
				"date": "2023-08-08",
				"hour": "16:56:00",
				"done": true
			}
		]
	},	
]
```
<hr/>

<h2><strong>/users/uuid</strong></h2>
<h3><strong>Encontrar usuário especifico</strong></h3>

```bash
# GET - /users/uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"name": "Bart Simpsom",
	"email": "bart@mail.com",
	"uuid": "0311b13c-c605-4c0f-a0f9-07b9c75d7910",
	"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690390946/esexeaxxi9vfdltioupt.jpg",
	"one_one_organizer": [
		{
			"title": "Criando Talking POint",
			"date": "2023-08-08",
			"hour": "00:00:00",
			"done": false
		},
		{
			"title": "Criação de One Ones",
			"date": "2023-08-08",
			"hour": "16:56:00",
			"done": false
		}
	],
	"one_one_guest": []
}
```
<hr/>

<h2><strong>/users/uuid</strong></h2>
<h3><strong>Editar seu usuário - Multiformparts</strong></h3>

```bash
# PATCH - /users/uuid - FORMATO DA REQUISIÇÃO

{
    profileImage: fileImage.jpg,
    name: Samir Dourado,
}

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"name": "Samir Dourado",
	"email": "samir@mail.com",
	"uuid": "0ab535bb-3329-44ab-b6bc-26cb103843ac",
	"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690391342/vn8aloy7xhmxuhbgetmk.jpg"
}
```
<hr/>

<h2><strong>/users/uuid</strong></h2>
<h3><strong>Deletar seu usuário</strong></h3>

```bash
# DELETE - /users/uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 204 No Content

no body
```
<hr/>
<hr/>
<hr/>

<h2><strong>/oneone</strong></h2>
<h3><strong>Criar one one</strong></h3>

```bash
# POST - /oneone - FORMATO DA REQUISIÇÃO
{
	"title": "Testando Retornos",
	"date": "26-7-2023",
	"hour": "12:00",
	"done": false,
	"guestUUID": "584d6f17-cdfa-4701-90b9-1cdf5c47ed87"	
}

# FORMATO DA RESPOSTA - STATUS 201 Created
{
	"uuid": "492769fe-cd5e-4800-bc49-5aca1c48d6be",
	"title": "Testando Retornos",
	"date": "26-7-2023",
	"hour": "12:00",
	"done": false,
	"organizerUUID": {
		"name": "Bart Simpsom",
		"email": "bart@mail.com",
		"uuid": "0311b13c-c605-4c0f-a0f9-07b9c75d7910",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690390946/esexeaxxi9vfdltioupt.jpg"
	},
	"guestUUID": {
		"name": "conta 3",
		"email": "conta3@mail.com",
		"uuid": "584d6f17-cdfa-4701-90b9-1cdf5c47ed87",
		"profileImage": null
	}
}
```
<hr/>

<h2><strong>/oneone/:uuid</strong></h2>
<h3><strong>listar todas one one do usuário</strong></h3>

```bash
# GET - /oneone/:uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 200 OK
[
	{
		"uuid": "fead0d93-817a-4570-92a2-227396db4b55",
		"title": "Criação de One Ones",
		"date": "2023-08-08",
		"hour": "16:56:00",
		"done": false,
		"organizerUUID": {
			"name": "Bart Simpsom",
			"email": "bart@mail.com",
			"uuid": "0311b13c-c605-4c0f-a0f9-07b9c75d7910",
			"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690390946/esexeaxxi9vfdltioupt.jpg"
		},
		"guestUUID": {
			"name": "Samir Dourado",
			"email": "samir@mail.com",
			"uuid": "0ab535bb-3329-44ab-b6bc-26cb103843ac",
			"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690391342/vn8aloy7xhmxuhbgetmk.jpg"
		},
		"talking_points": [
			{
				"uuid": "77588e21-a1d2-465e-ad3f-60f92352f267",
				"point": "Resolvendo problemas"
			},
			{
				"uuid": "c6117e56-0ee4-4674-9e40-ebe128df7335",
				"point": "Editando problemas"
			},
		],
		"notes": [
			{
				"uuid": "851fe803-826a-4d1b-a97e-025404c5e92b",
				"note": "Primeira anotação"
			},
		]
	},
]
```
<hr/>

<h2><strong>/oneoneespecific/:uuid</strong></h2>
<h3><strong>Encontrar one one especifica</strong></h3>

```bash
# GET - /oneoneespecific/:uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"uuid": "fead0d93-817a-4570-92a2-227396db4b55",
	"title": "Edição das",
	"date": "2023-08-08",
	"hour": "16:56:00",
	"done": true,
	"organizerUUID": {
		"uuid": "0311b13c-c605-4c0f-a0f9-07b9c75d7910",
		"name": "Bart Simpsom",
		"email": "bart@mail.com",
		"password": "$2a$10$6TIP0NLdq/9tbnnUzgq0AuxTpsRngsNMAgT6721FBowXjP6TggLNG",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690390946/esexeaxxi9vfdltioupt.jpg"
	},
	"guestUUID": {
		"uuid": "0ab535bb-3329-44ab-b6bc-26cb103843ac",
		"name": "Samir Dourado",
		"email": "samir@mail.com",
		"password": "$2a$10$qatHy0Dy6YpZg46WhpJ9yebxQR0o/AO7z7h5LwNuQvpMq00FSt8Vi",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690391342/vn8aloy7xhmxuhbgetmk.jpg"
	},
	"talking_points": [
		{
			"uuid": "77588e21-a1d2-465e-ad3f-60f92352f267",
			"point": "Resolvendo problemas"
		},		
	],
	"notes": [
		{
			"uuid": "851fe803-826a-4d1b-a97e-025404c5e92b",
			"note": "Primeira anotação"
		}
	]
}
```
<hr/>

<h2><strong>/oneone/:uuid</strong></h2>
<h3><strong>Editar one one</strong></h3>

```bash
# PATCH - /users/uuid - FORMATO DA REQUISIÇÃO

{	
	"done": true
}

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"uuid": "fead0d93-817a-4570-92a2-227396db4b55",
	"title": "Criação de One Ones",
	"date": "2023-08-08",
	"hour": "16:56:00",
	"done": true,
	"organizerUUID": {
		"name": "Bart Simpsom",
		"email": "bart@mail.com",
		"uuid": "0311b13c-c605-4c0f-a0f9-07b9c75d7910",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690390946/esexeaxxi9vfdltioupt.jpg"
	},
	"guestUUID": {
		"name": "Samir Dourado",
		"email": "samir@mail.com",
		"uuid": "0ab535bb-3329-44ab-b6bc-26cb103843ac",
		"profileImage": "https://res.cloudinary.com/dj0z0oxnj/image/upload/v1690391342/vn8aloy7xhmxuhbgetmk.jpg"
	}
}
```
<hr/>

<h2><strong>/oneone/uuid</strong></h2>
<h3><strong>Deletar one one</strong></h3>

```bash
# DELETE - /oneone/uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 204 No Content

no body
```
<hr/>
<hr/>
<hr/>

<h2><strong>/talkingpoints</strong></h2>
<h3><strong>Criar talking points</strong></h3>

```bash
# POST - /talkingpoints - FORMATO DA REQUISIÇÃO
{
	"point": "Retorno Recebido 2",	
	"oneOneUUID": "492769fe-cd5e-4800-bc49-5aca1c48d6be"	
}

# FORMATO DA RESPOSTA - STATUS 201 Created
{
	"uuid": "e8617267-3c9b-4b8d-a763-68d3393d78f0",
	"oneOneUUID": "492769fe-cd5e-4800-bc49-5aca1c48d6be",
	"point": "Retorno Recebido 2"
}
```
<hr/>

<h2><strong>/talkingpoints/:uuid</strong></h2>
<h3><strong>Listas todos os talking points da one one</strong></h3>

```bash
# GET - /talkingpoints/:uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 200 OK
[
	{
		"uuid": "77588e21-a1d2-465e-ad3f-60f92352f267",
		"point": "Point Editado"
	},
	{
		"uuid": "c6117e56-0ee4-4674-9e40-ebe128df7335",
		"point": "Editando problemas  1"
	},
	{
		"uuid": "86320646-b0e5-47e8-9dfe-7401333f5926",
		"point": "Concluindo tudo2"
	}
]
```
<hr/>

<h2><strong>/talkingpoints/:uuid</strong></h2>
<h3><strong>Editar talking point</strong></h3>

```bash
# PATCH - /talkingpoints/:uuid - FORMATO DA REQUISIÇÃO

{
	"point": "Point Editado"
}

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"uuid": "77588e21-a1d2-465e-ad3f-60f92352f267",
	"point": "Point Editado"
}
```
<hr/>

<h2><strong>/talkingpoints/:uuid</strong></h2>
<h3><strong>Deletar one one</strong></h3>

```bash
# DELETE - /talkingpoints/:uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 204 No Content

no body
```
<hr/>
<hr/>
<hr/>

<h2><strong>/notes</strong></h2>
<h3><strong>Criar nota</strong></h3>

```bash
# POST - /notes - FORMATO DA REQUISIÇÃO
{
	"note": "Nota dó",	
	"oneOneUUID": "492769fe-cd5e-4800-bc49-5aca1c48d6be"	
}

# FORMATO DA RESPOSTA - STATUS 201 Created
{
	"uuid": "1b2b6c92-94ef-4a2e-946c-ce19782ef250",
	"oneOneUUID": "492769fe-cd5e-4800-bc49-5aca1c48d6be",
	"note": "Nota dó"
}
```
<hr/>

<h2><strong>/notes/:uuid</strong></h2>
<h3><strong>Listas todos as anotações da one one</strong></h3>

```bash
# GET - /notes/:uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 200 OK
[
	{
		"uuid": "1acaf599-541d-4b3f-a229-630e281723ba",
		"note": "Nota dó"
	},
	{
		"uuid": "800c54ec-8200-4005-af38-d90e6e230c41",
		"note": "Nota Editada"
	}
]
```
<hr/>

<h2><strong>/notes/:uuid</strong></h2>
<h3><strong>Editar anotação</strong></h3>

```bash
# PATCH - /notes/:uuid - FORMATO DA REQUISIÇÃO

{
	"note": "Nota Quente"
}

# FORMATO DA RESPOSTA - STATUS 200 OK
{
	"uuid": "9e8d4831-9b81-4ecb-8245-9d647e9ad21f",
	"note": "Nota Quente"
}
```
<hr/>

<h2><strong>/notes/:uuid</strong></h2>
<h3><strong>Deletar anotação</strong></h3>

```bash
# DELETE - /notes/:uuid - FORMATO DA REQUISIÇÃO

no body

# FORMATO DA RESPOSTA - STATUS 204 No Content

no body
```
<hr/>
<hr/>
<hr/>
<hr/>