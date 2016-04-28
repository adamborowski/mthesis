import TOCGenerator from './TOCGenerator';
import CodeHighlighter from './CodeHighlighter';
import BibMaker from './BibMaker';
import FigureReference from './FigureReference';
import './css/bookRightCaption';
import Timer from './utils/Timer';
$(window).on('load', ()=> {
    var t = new Timer();
    t.start("TOC Generator");
    new TOCGenerator();
    t.next("Code Highlighter");
    new CodeHighlighter();
    t.next("Bib maker");
    new BibMaker();
    t.next("Figure refence");
    new FigureReference();
    t.finish();
});