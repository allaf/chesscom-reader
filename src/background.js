'use strict';


console.log("start of background")


//
/* eslint-disable no-undef */
const brw = browser;
// const ApiUtils = apiUtils;
const Utils = utils;
// const jQuery = $;
// /* eslint-enable no-undef */
//
// let TOKEN;
// let APIKEY;
// let RESTDB;
//
const URL_MATCH = 'https://www.chess.com/puzzles/rated';
const URL_LICHESS = 'https://lichess.org/editor';
const FILE_JQUERY = '/libs/jquery-3.5.1.min.js';
const FILE_CONTENT_SCRIPT_CHESSCOM = '/src/content_script_chesscom.js';
const FILE_CONTENT_SCRIPT_LICHESS = '/src/content_script_lichess.js';


function urlMatches(url) {
    return url.match(URL_MATCH);
}

function initializePageAction(tab) {
    if (urlMatches(tab.url)) {
        console.log("url MATCH")
        brw.pageAction.setTitle({tabId: tab.id, title: 'chesscom poc'});
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
    utils.executeScripts(tabId, [
        {file: FILE_JQUERY},
        {file: FILE_CONTENT_SCRIPT_CHESSCOM}
    ]);
}

brw.pageAction.onClicked.addListener((tabInfo) => {
    loadContentScript(tabInfo.id);
});

browser.runtime.onMessage.addListener((message) => {
    console.log("recu : ", message)
    let url = URL_LICHESS + '?fen=' + message.fen;
    browser.tabs.create({url}).then((tab) => {
        console.log('opened new tab : ', tab)
        browser.tabs.executeScript({
                id: tab.id,
                file: FILE_CONTENT_SCRIPT_LICHESS,
            }
        );
    });
});


console.log("end of background")