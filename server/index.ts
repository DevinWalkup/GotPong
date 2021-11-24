import http from 'http'
import express from 'express'
import _ from 'lodash'
import api from '@api/index'
import { loadNuxt, build } from 'nuxt'
import routes from './routes'
import cors from 'cors'

// Nuxt's render (using Connect) seems to ignore or override any handlers added to it so we create our own instance
const render = express()
const { APP_HOST, APP_PORT, NODE_ENV } = process.env
const dev = NODE_ENV !== 'production'

// start up Nuxt
export default loadNuxt(dev ? 'dev' : 'start').then(async nuxt => {
	if (dev) await build(nuxt)

  render.use(cors({
    origin: function (origin: string, callback: any) {
      let {APP_HOST, CLIENT_HOST} = process.env;
      const allowedOriginParts = [APP_HOST, CLIENT_HOST]
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (!allowedOriginParts.some(element => origin.includes(element))) {
        let msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  }));

	// attach basic middleware used in all routes
	render.use(express.json())

	// attach the api routes
	render.use('/api', api)

	// attach developer defined routes used for modifying or piping data to Nuxt
	render.use(routes)
	render.use(nuxt.render)

	const server = http.createServer(render)
	server.listen(Number(APP_PORT), APP_HOST, () => {
		console.info(`server listening on port ${APP_PORT}`)
	})

	return server
})
