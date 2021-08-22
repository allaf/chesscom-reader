'use strict';
(function () {
    /* eslint-disable no-undef */
    const brw = browser;
    /* eslint-enable no-undef */

    brw.runtime.onMessage.addListener((msg) => {
        if ('b' === msg.color) {
            document.querySelector('button[data-icon=\ue035]').click();
            document.querySelector('option[value=black]').selected = 'true';
            // go to analysis
        }
        const analysisUrl = document.querySelector('a[data-icon=\ue034]').href
        brw.runtime.sendMessage({analysisUrl, tabId: msg.tabId});
    });
})();
