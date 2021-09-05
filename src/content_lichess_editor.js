'use strict';
(function () {
    /* eslint-disable no-undef */
    const brw = browser;
    /* eslint-enable no-undef */

    function onUpdated(tab) {
        console.log(`Updated tab: ${tab.id}`);
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    brw.runtime.onMessage.addListener((msg) => {
        if ('b' === msg.color) {
            document.querySelector('button[data-icon=\ue035]').click();
            document.querySelector('option[value=black]').selected = 'true';
        }

        // Go to analysis
        const analysisUrl = document.querySelector('a[data-icon=\ue034]').href
        brw.runtime.sendMessage({analysisUrl, tabId: msg.tabId});
    });
})();
