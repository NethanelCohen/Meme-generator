var gCanvas;
var gCtx;
var elTextBox = document.querySelector('#text-line');


function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = "#ffecec";
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    addListeners()
    drawImg();
    drawText();
    // if (gSticker.lines.length !== 0) drawSticker();
}

function onEditLine(txt) {
    editLine(txt);
    renderCanvas()
}

function onAddLine() {
    addLine()
    gCurrLineTxt = '';
    elTextBox.value = '';
    renderCanvas()
}

function onSwitchLines() {
    switchLines()
    renderCanvas();
}

function onRemoveLine() {
    removeLine()
    elTextBox.value = gMeme.lines[currLineIdx].txt;
    renderCanvas()
}

function drawImg() {
    var img = new Image();
    img.src = gCurrUrl;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

// function drawSticker() {
//     if (gSticker.lines.length === 0) return
//     else {
//         var img = new Image();
//         return gSticker.lines.map(function(line) {
//             img.src = line.url;
//             gCtx.drawImage(img, 0, 0, 50, 50);
//         })
//     }
// }

function drawText() {
    let idx = 0
    return gMeme.lines.map(function(line) {
        gCtx.textAlign = line.align;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = line.color;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.strokeColor;

        if (idx > 7) {
            gCtx.strokeStyle = "black";
            gCtx.fillText(line.txt, 75, 220 + (idx * 3) + line.movedLine);
            gCtx.strokeText(line.txt, 75, 220 + (idx * 3) + line.movedLine);
            if (line.isFocused === true && line.txt.length > 0) {
                gCtx.strokeStyle = "black";
                gCtx.strokeRect(50, 180 + (idx * 3) + line.movedLine, 25 * (line.txt.length + 2), 50 + line.size / 2);
            }
            idx += 1;
            return
        } else if (!line.isFocused) {
            gCtx.fillText(line.txt, 75, 60 * (idx + 1) + line.movedLine);
            gCtx.strokeText(line.txt, 75, 60 * (idx + 1) + line.movedLine);
        }
        if (line.isFocused === true && line.txt.length > 0) {
            gCtx.fillText(line.txt, 75, (60 * (idx + 1)) + line.movedLine);
            gCtx.strokeText(line.txt, 75, (60 * (idx + 1)) + line.movedLine);
            gCtx.strokeStyle = "black";
            gCtx.strokeRect(50, (10 + (idx * 60) + line.movedLine), 25 * (line.txt.length + 2), 50 + line.size / 2);
        }
        idx += 7;
    })
}

function addListeners() {
    addMouseListeners();
    // addTouchListeners();
}

function addMouseListeners() {
    // gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
        // gCanvas.addEventListener('mouseup', onUp)
}

// function addTouchListeners() {
//     gCanvas.addEventListener('touchmove', onMove)
//     gCanvas.addEventListener('touchdown', onDown)
//         gCanvas.addEventListener('touchup', onUp)
// }

function onDown(ev) {
    var where = getEvPos(ev);
    console.log(where);
}

function getEvPos(ev) {
    var pos = {
            x: ev.offsetX,
            y: ev.offsetY
        }
        // if (gTouchEvs.includes(ev.type)) {
        //     ev.preventDefault();
        //     ev = ev.changedTouches[0];
        //     pos = {
        //         x: ev.pageX - ev.target.offsetLeft,
        //         y: ev.pageY - ev.target.offsetTop
        //     }
        // }
    return pos;
}