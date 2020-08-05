exports.textWithRemoveQ = (text) => {
    return "__GENERATOR_REMOVE_START_QUOTATION__" + text + "__GENERATOR_REMOVE_END_QUOTATION__"
}
exports.Ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.Lcfirst = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

exports.replaceQText = (text) => {
    text = replace(text, `"__GENERATOR_REMOVE_START_QUOTATION__`, "")
    text = replace(text, `__GENERATOR_REMOVE_END_QUOTATION__"`, "")
    text = replace(text, `__GENERATOR_REMOVE_START_QUOTATION__`, "")
    return replace(text, `__GENERATOR_REMOVE_END_QUOTATION__`, "")

}

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
const replace = (txt, searchTxt, replaceTxt) => {
    if (searchTxt) {
        searchTxt = searchTxt.replace(matchOperatorsRegex, '\\$&');
        return txt.replace(new RegExp(searchTxt, "g"), replaceTxt)
    }
    return txt
}