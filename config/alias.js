import path from 'path'
const rootDir = path.resolve(__dirname, '..')
const folders = [
	'assets',
	'components',
	'includes',
	'layouts',
	'middleware',
	'pages',
	'plugins',
	'static',
	'store',
	'typings',
	'config',
	'server'
]
const aliases = {}

folders.forEach(folder => {
	aliases['@' + folder] = path.resolve(rootDir, folder)
})

export default aliases
