
function $ct(element, text){
    let el = document.createElement(element)

    if(text !== null && text !== undefined && text.length > 0){
        el.innerText = text;
    }

    return el;
}

function $g(selector){
    let nodeList = document.querySelectorAll(selector);

    if(nodeList.length == 0){
        return null;
    }

    return nodeList.length == 1 ? nodeList[0] : nodeList;
}

function $ce(element, text) {
    let el = document.createElement(element);
    if (typeof (text) !== "undefined" && typeof (text) !== "" && typeof (text) !== null) {
        el.innerText = text;
    }
    return el;
}

export { $ct, $g ,$ce}; //公開呼叫