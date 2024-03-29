import TOCGenerator from './TOCGenerator';
import TOCFigureGenerator from './TOCFigureGenerator';
import CodeHighlighter from './CodeHighlighter';
import BibMaker from './BibMaker';
import FigureReference from './FigureReference';
import './css/bookRightCaption';
import Timer from './utils/Timer';
import LanguageDecorator from './LanguageDecorator';
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
    t.next("Table of images");
    new TOCFigureGenerator($('#table-of-pictures'), 'picture');
    t.next("Table of tables");
    new TOCFigureGenerator($('#table-of-tables'), 'table');
    t.next("Table of codes");
    new TOCFigureGenerator($('#table-of-codes'), 'code');
    t.next("Language Decorator")
    new LanguageDecorator();
    t.finish();
});