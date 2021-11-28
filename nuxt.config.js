export default {
	ssr: true,

	// Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GotPong',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },

      //Default Meta Tags
      { name: "name", content: "GotPong" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simple way to tally your Beer Pong wins!' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: 'Beer Pong, Tally, Party, Beer, Frat, Game, Vue.js, Nuxt.js, Express, Node.js'},
      { name: 'author', content: 'Devin Walkup'},

      //Schema.org markup for Google+
      { itemprop: 'name', content: 'GotPong' },
      { itemprop: 'description', content: "A simple way to tally your Beer Pong wins!" },
      { itemprop: 'image', content: 'http://www.gotpong.party/Logo.png'},

      //Twitter Card data
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: "GotPong" },
      { name: 'twitter:description', content: 'A simple way to tally your Beer Pong wins!' },
      { name: 'twitter:creator', content: '@dewalkup' },
      { name: 'twitter:image:src', content: 'http://www.gotpong.party/Logo.png' },

      //Open Graph Data for Facebook
      {name: 'og:title', content: "GotPong"},
      {name: 'og:type', content: "website"},
      {name: 'og:url', content: "http://www.gotpong.party"},
      {name: 'og:image', content: 'http://www.gotpong.party/Logo.png'},
      {name: 'og:description', content: 'A simple way to tally your Beer Pong wins!'},
      {name: 'og:site_name', content:"GotPong"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['@plugins/api'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

  serverMiddleware: {
    '/api' : '~/api'
  },

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

  tailwindcss: {
    config: {
      safelist: [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'text-red-500',
        'text-blue-500',
        'text-green-500',
        'text-yellow-500',
        'text-purple-500',
        'text-pink-500',
      ]
    }
  },

  env: {
    APP_URL: process.env.APP_URL || 'http://localhost:3000'
  },

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
}
