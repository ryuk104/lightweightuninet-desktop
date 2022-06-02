import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

//import adapter from '@sveltejs/adapter-node';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import cssnano from 'cssnano'
import path from 'path'
import sveltePreprocess from 'svelte-preprocess'
import dotenv from 'dotenv';
import autoprefixer from 'autoprefixer'


dotenv.config();

const rootDomain = process.env["VITE_DOMAIN"]; // or your server IP for dev
const originURL = process.env["VITE_SITE_URL"]; // or your server IP for dev

const check = process.env.NODE_ENV
const dev = process.env.NODE_ENV === 'development'



/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		files: {
			assets: 'static',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html',
			hooks: 'src/hooks'
		},
		version: { pollInterval: 600000 },
		vite: {
			resolve: {
				alias: {
					$stores: path.resolve('./src/lib/stores'),
					$api: path.resolve('./src/routes/api'),
					$components: path.resolve('./src/lib/components')
					}
				}
			}
		},
		onwarn(warning, defaultHandler) {
			// don't warn on <marquee> elements, cos they're cool
			if (warning.code === "css-unused-selector") return;
	
			// handle all other warnings normally
			defaultHandler(warning);
		}

	
};

export default config;
