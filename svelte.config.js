import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: undefined,
            precompress: false,
            strict: true,
        }),
        // Consult https://kit.svelte.dev/docs/configuration#alias
        alias: {
            $svg: "src/svg",
            $app_components: "src/app_components",
            $states: "src/states",
        },
    },
    paths: {
        base: ".",
        relative: true,
    },
};

export default config;
