(() => {
    var body = getItem(document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'body'), 0);

    var addScopedState = (itemKey) => {
        console.log('CREATE SCOPED STATE');
        var _itemKey = `${itemKey}${createHash(`${itemKey}${btoa(`${Date.now()}`)}`)}`;
        return (() => {
            stateStack[itemKey] = {
                state: null,
                prevState: null,
            }

            var setState = (newState) => {
                var state = newState;
                if (typeof stateStack[itemKey] === 'undefined') {
                    stateStack[itemKey].state = state;
                    stateStack[itemKey].prevState = state;
                }
                stateStack[itemKey].state = state;
            };
            return [stateStack[itemKey], setState];
        })();
    }

    var registryStack = {
        'system/global/state': (() => {
            var store = {
                prev: {},
                curr: {},
            };
            return {
                state: 'loaded',
                store,
                func: (() => ({
                    getStore: () => store.curr,
                    setStore: (node, value) => {
                        var _node = node.split('.');
                        var util = (nodeItems) => {
                            if (nodeItems.length === 1) {
                                return {
                                    [nodeItems[0]]: value,
                                };
                            }
                            var newNodeItems = nodeItems.slice();
                            newNodeItems.shift()
                            return {
                                [nodeItems[0]]: util(newNodeItems),
                            };
                        };
                        store.curr = { ...store.curr, ...util(_node) };
                    },
                }))(),
            };
        })(),
        'system/global/curry': (callback, ...args) => (...argsv) => callback(...args, ...argsv),
        // @todo preserve 'local' state after re-rendering!!!
        'system/global/curryState': (callback, itemKey) => (...argsv) => callback(...argsv, addScopedState(itemKey)),
    };

    var hasStateChanged = (current, prev) => {
        var _curr = JSON.stringify(current);
        var _prev = JSON.stringify(prev);
        if (_prev !== _curr) {
            return true;
        }
        return false;
    }

    var newNode;
    var rootNode;

    var stateStack = {};
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

    var allDependenciesLoaded = (dependencies) => {
        const loaded = new Array(dependencies.length);
        dependencies.forEach((item, index) => {
            if (typeof registryStack[item] !== 'undefined' && registryStack[item].state === 'loaded') {
                loaded[index] = true;
            }
        });
        return loaded.filter(item => !!item).length === dependencies.length;
    }

    // @todo singletons
    // @todo stylings

    var initialStack = {
        state: 'pending',
        func: undefined,
        dependencies: [],
        isComponent: false,
    };

    var loadScript = (name) => {
        if (typeof registryStack[name] === 'undefined') {
            registryStack[name] = { ...initialStack };
        };
        var tag = createTag('script', { src: name+'.js', type: 'text/javascript' });
        body.appendChild(tag);
    }

    var resolveDeps = (func, dependencies) => {
        return func(
            [
                ...dependencies.map(
                    (item, index) => {
                        if (!!registryStack[item].isComponent) {
                            return registryStack['system/global/curryState'](
                                registryStack[item].func,
                                `${item}${index}`
                            );
                        }
                        return registryStack[item].func;
                    }
                )
            ],
        );
    }

    var register = (name, dependencies, func, isComponent) => {
        if (typeof registryStack[name] === 'undefined') {
            registryStack[name] = { ...initialStack, isComponent };
        }

        dependencies.forEach((item) => {
            if (typeof registryStack[item] === 'undefined' && item.indexOf('system/global') < 0) {
                loadScript(item);
            }
        });

        var intervalTick = 0;
        var itemKey = `${name}${createHash(`${name}${btoa(`${Date.now()}`)}`)}`;
        var interval = window.setInterval(() => {
            intervalTick++;
            if (allDependenciesLoaded(dependencies) && name.indexOf('system/global') < 0) {
                window.clearInterval(interval);
                registryStack[name] = {
                    state: 'loaded',
                    isComponent: !!isComponent,
                    func: !!isComponent ?
                        registryStack['system/global/curryState'](
                            resolveDeps(func, dependencies),
                            `${itemKey}`
                        ): resolveDeps(func, dependencies),
                    dependencies,
                };

                // @todo: Store-Change-Prüfung und Re-Rendering auslagern!
                if (name.indexOf('./modules/Index') === 0) {
                    rootNode = registryStack[name].func();
                    body.appendChild(rootNode);
                    var block = false;
                    var checkForHashChange = window.setInterval(
                        () => {
                            try {
                                var stackedItems = Object.keys(stateStack);
                                var rerender = false;
                                stackedItems.forEach((key) => {
                                    var item = stateStack[key];
                                    if (hasStateChanged(item.state, item.prevState)) {
                                        item.prevState = item.state;
                                        rerender = true;
                                    }
                                });
                                var { store } = registryStack['system/global/state'];

                                if (hasStateChanged(store.curr, store.prev)) {
                                    store.prev = store.curr;
                                    rerender = true;
                                }
                                if (!!rerender) {
                                    newNode = registryStack[name].func();
                                    rootNode.replaceWith(newNode);
                                    rootNode = newNode;
                                }
                            } catch (e) {
                                console.log('CAUGHT', e);
                                window.clearInterval(checkForHashChange);
                            };
                        },
                        100
                    );
                }
            }
            if (intervalTick > 100) {
                window.clearInterval(interval);
            }
        }, 5);
    };

    window.registerUtil = (name, dependencies, func) => {
        register(name, dependencies, func, false);
    };
    window.registerComponent = (name, dependencies, func) => {
        register(name, dependencies, func, true);
    }

    window.run = true;
})();