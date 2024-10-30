import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

//@ts-ignore
const isBundle = process.env.VITE_BUNDLE === 'true'

console.log(isBundle)

// https://vitejs.dev/config/
export default defineConfig({
	base: isBundle ? './' : '/pfxr/',
	plugins: [svelte()],
})
