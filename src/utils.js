var utils = {
    executeScripts: (tabId, injectDetailsArray) => {
        function createCallback(tabId, injectDetails, innerCallback) {
            return function () {
                // eslint-disable-next-line no-undef
                browser.tabs.executeScript(tabId, injectDetails, innerCallback);
            };
        }

        var callback = null;
        for (var i = injectDetailsArray.length - 1; i >= 0; --i) {
            callback = createCallback(tabId, injectDetailsArray[i], callback);
        }
        if (callback !== null) {
            // execute outermost function
            callback();
        }
    }
};

try {
    module.exports = utils;
} catch (error) {
    // console.warn('module export failed', error);
}