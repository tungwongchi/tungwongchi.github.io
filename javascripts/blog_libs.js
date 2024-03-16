
function getQueryStringParams(query) {
    query = query.substring(query.charAt(0) === '?' ? 1 : 0);
    var params = {};
    var queryParts = query.split('&');
    queryParts.forEach(function(param) {
        var parts = param.split('=');
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1] || '');
        params[key] = value;
    });
    return params;
}

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
    if (level === 1) {
        return '<h2 class="article-title">' + text + '</h2>';
    } else if (level === 2) {
        return '<div class="abstract"><h2>' + text + '</h2>';
    } else {
        return '<div class="section"><h2>' + level + '. ' + text + '</h2>';
    }
};
renderer.paragraph = function (text) {
    if (text.startsWith('Posted on')) {
        return '<p class="metadata">' + text + '</p>';
    } else {
        return '<p>' + text + '</p>';
    }
};

const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = function(code, infostring, escaped) {
    if (infostring === "mermaid") {
        return `<div class="mermaid">${code}</div>`;
    }
    return originalCodeRenderer(code, infostring, escaped);
};

mermaid.init();

marked.use({ renderer });
