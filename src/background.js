'use strict';
//TODO recharger le même onglet
/* eslint-disable no-undef */
const brw = browser;
const Utils = utils;
/* eslint-enable no-undef */
const URL_MATCH = 'https://www.chess.com/puzzles/rated';
const URL_LICHESS = 'https://lichess.org/editor';
const FILE_CONTENT_SCRIPT_CHESSCOM = '/src/content_chesscom.js';
const FILE_CONTENT_SCRIPT_LICHESS = '/src/content_lichess_editor.js';


function urlMatches(url) {
    return url.match(URL_MATCH);
}

function initializePageAction(tab) {
    if (urlMatches(tab.url)) {
        brw.pageAction.show(tab.id);
    }
}

/*
When first loaded, initialize the page action for all tabs.
*/
brw.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
        initializePageAction(tab);
    }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
brw.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});

function loadContentScript(tabId) {
    // eslint-disable-next-line no-undef
    Utils.executeScripts(tabId, [
        {runAt: 'document_end', file: FILE_CONTENT_SCRIPT_CHESSCOM}
    ]);
}

brw.pageAction.onClicked.addListener((tab) => {
    loadContentScript(tab.id);
});

brw.runtime.onMessage.addListener((msg) => {
    if (msg.analysisUrl) {
        brw.tabs.update(msg.tabId, {url: msg.analysisUrl});
    } else if (msg.fen) {
        const url = URL_LICHESS + '?fen=' + msg.fen;
        brw.tabs.create({url}).then((tab) =>
            brw.tabs.executeScript(tab.id, {
                runAt: 'document_idle',
                file: FILE_CONTENT_SCRIPT_LICHESS,
            }).then(() =>
                brw.tabs.sendMessage(tab.id, {color: url.slice(-1), tabId: tab.id})
            )
        );
    }
});

