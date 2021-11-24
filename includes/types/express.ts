import moment from 'moment-timezone'

declare module 'express' {
	interface Request extends Express.Request {
		ServingSocket: boolean
	}
}

declare module 'http' {
	interface IncomingMessage {
		data?: any
		moment?: typeof moment
	}
}
