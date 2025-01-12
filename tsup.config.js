import { defineConfig } from 'tsup';
import fg from 'fast-glob';

export default defineConfig({
    entry: fg.globSync('eagler-files/**/*.js'),
    format: ['esm'],
    target: ['chrome131'],
    dts: false,
    clean: true,
    sourcemap: true,
    minify: true,
    watch: false,
    outDir: 'dist',
});