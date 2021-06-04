var appendStyle = ((component, stylings) => {
    var hashMap = {};

    return (component, stylings) => {

        var createHash = (item) => {
            var hash = 0, i, chr;
            if (item.length === 0) return hash;
            for (i = 0; i < item.length; i++) {
            chr   = item.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };

        var className = btoa(`${createHash(stylings)}`).replace(/=/gi, '');
        var classNameAttr = document.createAttribute('class');
        classNameAttr.value = className;
        component.setAttributeNode(classNameAttr);
        if (!!hashMap[className]) {
            return component;
        } else {
            hashMap[className] = true;
        }

        var body = getItem(document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head'), 0);
        var styleTag = document.createElementNS('http://www.w3.org/1999/xhtml', 'style');
        styleTag.setAttribute('type', 'text/css');
        body.appendChild(styleTag);

        styleTag.appendChild(
            document.createTextNode(
                `.${className} {${stylings}};`
            )
        );

        return component;
    };
})();

var createTag = (tagName, attributes, children) => {
    var supportedTags = ['p', 'span', 'img', 'div', 'script', 'text', 'input'];
    var specialProps = ['onclick', 'onfocus', 'onblur'];
    var refacedName = tagName.toLocaleLowerCase();
    var renderTag = (_tagName, _attributes, _children) => {
        var _tag;
        if (_tagName !== 'text') {
            _tag = document.createElementNS('http://www.w3.org/1999/xhtml', _tagName);

            if (_attributes && Object.keys(_attributes).length > 0) {
                Object.keys(_attributes).forEach((key) => {
                    if (_attributes.hasOwnProperty(key)) {
                        if (specialProps.findIndex((specialProp) => specialProp === key) >= 0) {
                            _tag[key] = _attributes[key];
                        } else {
                            var attr = document.createAttribute(key);
                            attr.value = _attributes[key];
                            _tag.setAttributeNode(attr);
                        }
                    }
                });
            }

            if (_children) {
                (!Array.isArray(_children) ? [_children] : _children).forEach((child) => {
                    _tag.appendChild(child);
                });
            }
        } else {
            _tag = document.createTextNode(_children);
        }
        return _tag;
    }

    if (supportedTags.findIndex((supportedTag) => supportedTag === refacedName) < 0) {
        return renderTag('div', {}, 'Unknown tag name' + tagName);
    }

    return renderTag(refacedName, attributes, children);
}

var getItem = (obj, key, defaultValue) => {
    if (obj && obj[key]) {
        return obj[key];
    }
    return defaultValue || '';
}

(() => {
    var body = getItem(document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'body'), 0);

    // memoizing!
    var loadScript = (name) => {
        var tag = createTag('script', { src: name+'.js', type: 'text/javascript' });
        body.appendChild(tag);
    }

    if (document) {
        loadScript('./system/registry');
        var runSt = window.setTimeout(() => {
            if (!!window.run) {
                loadScript('./modules/Index');
                window.clearTimeout(runSt);
            }
        }, 50);
    } else {
        console.log('no document available');
    }
})();