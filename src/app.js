import express from 'express';

import generateServerEngine from './engine';
import SceneList from './game/scenes/index';

const states = {
	IDLE: "IDLE",
	ACTIVE: "ACTIVE",
}

async function generateGameServer() {

	var app = express();
	var cors = require('cors');
	app.use(cors());

	// Test Routes
	app.get('/', function(req, res) {
		res.json({ foo: 'bar' });
	})
	app.get('/printenv', function(req, res) {
		res.json(process.env);
	})

	app.locals.state = states.IDLE
	app.locals.game = null
	app.locals.active_scene = null
	// To Do: change to grab status straight from game server
	app.get('/state', function(req, res) {
	  res.json({
	  	state: req.app.locals.state,
	  	scene: req.app.locals.active_scene,
	  });
	})

	// change back to post later pls
	// app.post('/assign', function (req, res) {
	app.get('/assign', async function (req, res) {

		// To Do: validate requester so it's not coming from someone random

		var scene = req.query.scene
		if (!scene || !(scene in SceneList)) {
			res.status(400).json({
				success: false,
				data: {},
				error: {
					message: "Bad Request: Scene either missing or does not exist."
				}
			})
			return;
		}

		switch(req.app.locals.state) {

			case states.IDLE:
				let { game, io } = await generateServerEngine(scene);
				io.path(`${ req.app.mountpath }/socket.io`);
				io.attach(req.connection.server);

				req.app.locals.game = game;
				req.app.locals.state = states.ACTIVE;
			  	req.app.locals.active_scene = scene;

				res.status(200).json({
					success: true,
					data: {
						message: "OK: Server successfully assigned to Scene."
					}
				})
				break;

			case states.ACTIVE:
				res.status(409).json({
					success: false,
					data: {},
					error: {
						message: "Conflict: Server is already running ACTIVE."
					}
				})
				break;

			default:
				res.status(500).end()

		}
	})

	return app;
}

module.exports = generateGameServer
