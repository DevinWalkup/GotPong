import { Router, Application } from 'express'

export function loadAPIRoutes(router: Router | Application, p: string[]) {
	p.forEach(route_path => {
		const route: Router = require(`../api/${route_path}`).default
		if (!route) return
		console.info(`loading @api/${route_path}`)
		router.use(route)
	})
}

export function generateGameCode() {
  const nums = new Set();
  while(nums.size !== 6) {
    nums.add(Math.floor(Math.random() * 9) + 1);
  }

  return Array.from(nums).join("");
}
