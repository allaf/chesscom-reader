'use strict';
(function () {

    /* eslint-disable no-undef */
    const brw = browser;
    /* eslint-enable no-undef */

    function hasPieceOn(n1, n2, elts) {
        const res = elts.filter(elt => {
            return elt.classList.contains(`square-${n1}${n2}`)
        })
        return res[0];
    }

    function convertPieceName(pieceName) {
        return (pieceName[0] === 'w') ?
            pieceName[1].toUpperCase() :
            pieceName[1]
    }

    function main() {
        const blackToMove = window.document.querySelectorAll('div[class*=\'sidebar-status-square-black\']');
        const divs = Array.from(window.document.querySelectorAll('div[class*=\'piece\']:not(.promotion-piece)'));

        if (!divs || divs.length === 0) {
            console.warn('no board found')
            return;
        }
        let fen = '';

        for (let line = 0; line < 8; line++) {
            let strLine = '';
            let cpt = 0
            for (let col = 0; col < 8; col++) {
                const n1 = 1 + ((col + 8) % 8);
                const n2 = (8 - line);
                const piece = hasPieceOn(n1, n2, divs);
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
                    if (col === 7) {
                        strLine += cpt
                    }
                }
            }
            fen += strLine + ((line < 7) ? '/' : '');
        }

        fen += '_' + ((blackToMove.length > 0) ? 'b' : 'w');
        // console.log(`https://www.lichess.org/editor?fen=${fen}`)

        brw.runtime.sendMessage({fen});
        return fen;
    }

    main()
})();
