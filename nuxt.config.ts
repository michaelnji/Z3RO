// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: false },
	vite: {
		plugins: [tailwindcss()],
	},
	modules: [
		"@nuxt/fonts",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@pinia/nuxt",
		"pinia-plugin-persistedstate/nuxt",
		"@vueuse/nuxt",
		"@unocss/nuxt",
		// '@nuxtjs/tailwindcss',
		"shadcn-nuxt",
		"nuxt-time",
	],
	// css: ['~/assets/css/tailwind.css'],
	piniaPluginPersistedstate: {
		storage: "localStorage",
		key: "z3ro_%id_storekey",
	},
	icon: {
		customCollections: [
			{
				prefix: "kira",
				dir: "./assets/icons",
			},
		],
		clientBundle: {
			// list of icons to include in the client bundle
			icons: [],
			// include all custom collections in the client bundle
			includeCustomCollections: true,
		},
	},
	image: {
		format: ["webp", "png", "jpeg"],
		// define your own presets
		presets: {
			avatar: {
				modifiers: {
					format: "jpg",
					width: 50,
					height: 50,
				},
			},
		},
	},
	fonts: {
		defaults: {
			weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
			styles: ["normal", "italic"],
		},
		// use ~public/fonts for your font files
		provider: "local",
	},
	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},
	runtimeConfig: {
		currencyApiUrl: "",
		currencyApiKey: "",
		animeUrl: "",
		sunsetUrl: "",
		quotesUrl: "",
		foodUrl: '',
	},
});