import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
    //const currentURL = useLocation().search
    return {
        plugins: [
            react({
                babel: {
                    plugins: [["babel-plugin-react-compiler"]],
                },
            }),
        ],
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: "globalThis",
                },
            },
            include: ['buffer'],
        },
        server: {
            host: "0.0.0.0",
            port: 3000,
            strictPort: false,
        },
        define: {
            global: "window",
        },
        base: "./",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                'buffer': 'buffer/',
            },
        },
    };
});
