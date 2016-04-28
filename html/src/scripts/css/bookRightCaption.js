
function rightCaption(chapter, section, subsection, chapterString, sectionString, subsectionString) {
    var caption = chapterString;
    var label = "Rozdział";
    var version = chapter + ".";
    if (section > 0) {
        caption = sectionString;
        label = "Podrozdział ";
        version += section + ".";
    }
    if (subsection > 0) {
        caption = subsectionString;
        label = "Podrozdział ";
        version += subsection + ".";
    }

    return `${label} ${version} ${caption}`;
}

Prince.addScriptFunc("book-right-caption", rightCaption);