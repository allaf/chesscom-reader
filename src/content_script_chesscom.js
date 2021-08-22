'use strict';
(function () {

    console.log("CONTENT SCRIPT :)")

    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function hasPieceOn(n1, n2, elts) {
        let res = elts.filter(elt => {
            let l = elt.classList;
            return l.contains(`square-${n1}${n2}`)
        })
        return res[0];
    }

    function convertPieceName(pieceName) {
        if (pieceName)
            return (pieceName[0] == 'w') ?
                pieceName[1].toUpperCase() :
                pieceName[1]
    }

    function main() {
        console.log("main start")

        let blackToMove = window.document.querySelectorAll(`div[class*='sidebar-status-square-black']`);
        let divs = Array.from(window.document.querySelectorAll(`div[class*='piece']:not(.promotion-piece)`));

        if (!divs || divs.length == 0) {
            console.log("no board founds")
            return;
        }
        let fen = '';

        for (let line = 0; line < 8; line++) {
            let strLine = '';
            let cpt = 0
            for (let col = 0; col < 8; col++) {
                let n1 = 1 + ((col + 8) % 8);
                let n2 = (8 - line);
                let piece = hasPieceOn(n1, n2, divs);
                if (piece) {
                    if (cpt > 0) {
                        strLine += cpt;
                        cpt = 0;
                    }
                    let pieceName = Array.from(piece.classList).filter(x => !(x.startsWith('square') || x.startsWith('piece'))).shift();
                    pieceName = convertPieceName(pieceName);
                    strLine += pieceName;
                } else {
                    cpt++
                    if (col == 7) {
                        strLine += cpt
                    }
                }
            }
            fen += strLine + ((line < 7) ? '/' : '');
        }

        // let blackOrWhiteToPlay = "0"
        // if (blackToMove.length > 0) {
        //     blackOrWhiteToPlay = "1"
        // }

        fen += '_' + ((blackToMove.length > 0) ? 'b' : 'w');
        console.log("the fen=" + fen)
        console.log("https://www.lichess.org/editor?fen=" + fen)

        browser.runtime.sendMessage({fen});
        return fen;
    }

    main()
})();
