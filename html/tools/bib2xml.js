#!/usr/bin/env node
process.stdin.setEncoding('utf8');
var chunks = [];
process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    chunks.push(chunk);
});

process.stdin.on('end', () => {
    processBib(chunks.join(''));
});

function processBib(plain) {

    var result = plain
        .replace(/@(.*){(.*),/gm, '<citation type="$1" id="$2">') //citation headers
        .replace(/^}/gm, '</citation>') //enclosing tag
        .replace(/howpublished\s*=\s*{"\\url{(.*)}"}/gm, "url = {$1}") // howpublished into url
        .replace(/(\w*)\s*=\s*\{(.*)},?[^,]?$/gm, '<$1>$2</$1>') // attributes into tags
        .replace(/\s*#(.*)$/gm, '\n<!-- $1 -->') // commentation syntax
        ;

    process.stdout.write(result);
}