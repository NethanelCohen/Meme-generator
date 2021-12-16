var gMeme;
var gSticker;
var gCurrLineTxt = '';
var gCurrUrl = '';
var currLineIdx;


function renderMemes() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [{
                txt: '',
                size: 40,
                align: 'left',
                color: 'white',
                strokeColor: 'black',
                font: 'Impact',
                isFocused: true,
                movedLine: 0
            }]
            // };
            // gSticker = {
            //     selectedStickerLineIdx: 0,
            //     lines: [{
            //         url: '',
            //         size: 50,
            //         isFocused: true,
            //         movedLine: 0
            //     }]
            // };
    }
    currLineIdx = gMeme.selectedLineIdx;
}

function editLine(txt) {
    gCurrLineTxt = txt;
    gCurrLineTxt.toUpperCase();
    gMeme.lines[currLineIdx].txt = gCurrLineTxt;
    gMeme.lines[currLineIdx].isFocused = true;
}

function addLine() {
    if (elTextBox.value) {
        gMeme.lines[currLineIdx].txt = gCurrLineTxt;
        gMeme.lines[currLineIdx].isFocused = false;
        currLineIdx++;
        gMeme.lines.push({
            txt: '',
            size: 40,
            align: 'left',
            color: 'white',
            strokeColor: 'black',
            font: 'Impact',
            isFocused: true,
            movedLine: 0
        })
        gMeme.lines[currLineIdx].isFocused = true;
    }
}

function switchLines() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[currLineIdx].isFocused = false;
    if (currLineIdx >= 0) currLineIdx++;
    if (currLineIdx > gMeme.lines.length - 1) currLineIdx = 0;
    gMeme.lines[currLineIdx].isFocused = true;
    elTextBox.value = gMeme.lines[currLineIdx].txt;
    gCurrLineTxt = gMeme.lines[currLineIdx].txt;
}

function removeLine() {
    if (currLineIdx !== 0 && gMeme.lines.length - 1 !== 0) {
        gMeme.lines.splice(currLineIdx, 1);
        currLineIdx = gMeme.lines.length - 1;
    } else if (currLineIdx === 0 && gMeme.lines.length - 1 !== 0) {
        gMeme.lines.splice(currLineIdx, 1);
        currLineIdx = gMeme.lines.length - 1;
    } else {
        currLineIdx = 0;
        gMeme.lines[currLineIdx].txt = '';
        gMeme.lines[currLineIdx].movedLine = 0;

    }
    gMeme.lines[currLineIdx].isFocused = false;
}

function textLineUp() {
    var elFocus = gMeme.lines.find(function(line) {
        return line.isFocused === true;
    })
    elFocus.movedLine -= 10;
    renderCanvas();
}

function textLineDown() {
    var elFocus = gMeme.lines.find(function(line) {
        return line.isFocused === true;
    })
    elFocus.movedLine += 10;
    renderCanvas();
}

function fontSizeUp() {
    gMeme.lines[currLineIdx].size += 2;
    renderCanvas()
}

function fontSizeDown() {
    gMeme.lines[currLineIdx].size -= 2;
    renderCanvas()
}

function textAlignLeft() {
    gMeme.lines[currLineIdx].align = 'left';
    renderCanvas()
}

function textAlignCenter() {
    gMeme.lines[currLineIdx].align = 'center';
    renderCanvas()
}

function textAlignRight() {
    gMeme.lines[currLineIdx].align = 'right';
    renderCanvas()
}

function fontFamily(font) {
    gMeme.lines[currLineIdx].font = font;
    renderCanvas();
}

function fontColor(color) {
    gMeme.lines[currLineIdx].color = color;
    renderCanvas();
}

function fontStrokeColor(color) {
    gMeme.lines[currLineIdx].strokeColor = color;
    renderCanvas();
}

function downloadMeme(elLink) {
    var imgContent = gCanvas.toDataURL('image/png')
    elLink.href = imgContent
}

function saveMeme() {
    onAddLine()
    var canvasURL = gCanvas.toDataURL();
    gSavedImg.push({ id: _makeId(), url: canvasURL });
    _saveMemeToStorage()
    renderMemes()
    renderCanvas()
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedImg)
}

// function addSticker(url) {
//     console.log(url);
// gSticker.lines[selectedStickerLineIdx].url = url;
// gSticker.lines.push({
//     url: '',
//     size: 50,
//     isFocused: true,
//     movedLine: 0
// });
// gSticker.selectedStickerLineIdx++;
// renderCanvas()
// }