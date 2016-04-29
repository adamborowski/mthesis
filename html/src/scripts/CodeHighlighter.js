export default class CodeHighlighter {
    constructor() {
        $('figure[type="code"] code').each((i, $code)=> {
            this.correctWhitespacesForCode($code);
            hljs.highlightBlock($code);
        });
    }

    correctWhitespacesForCode($code) {
        var lines = $code.textContent.split('\n');
        if (lines[0] === '') {
            lines.shift()
        }
        var matches;
        var indentation = (matches = /^[\s\t]+/.exec(lines[0])) !== null ? matches[0] : null;
        if (!!indentation) {
            lines = lines.map(function (line) {
                line = line.replace(indentation, '')
                return line.replace(/\t/g, '    ')
            });
            $code.textContent = lines.join('\n').trim();
        }
    }
}