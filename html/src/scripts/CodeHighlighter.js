export default class CodeHighlighter {
    constructor() {
        // $('figure[type="code"] code').each((i, block)=> {
        //     block.innerHTML = block.innerHTML.trim();
        //     hljs.highlightBlock(block);
        // });
        hljs.initHighlighting();
    }
}