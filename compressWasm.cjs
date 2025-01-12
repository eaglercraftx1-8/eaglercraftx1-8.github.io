const { readFileSync, writeFileSync } = require('node:fs');
const fg = require('fast-glob');

let brotliWasm;

(() => {
    brotliWasm = require('brotli-wasm');
})();

const { compress } = brotliWasm;

((
    /** @type {string} */
    globPattern
) => {
    console.warn('Warning: If you provide more than two files as arguments');
    console.warn('it will only compress the first file due to performance');
    console.warn('reasons. You can change this behavior by modifying the');
    console.warn('function calling at the end of the script.');

    for (const file of fg.globSync(globPattern)) {
        const compressedFile = compress(readFileSync(file), {
            quality: 11,
        });

        console.log(`Compressed ${file} from ${readFileSync(file).length} to ${compressedFile.length} bytes`);

        writeFileSync(file, compressedFile);
    }
})(process.argv[2]);