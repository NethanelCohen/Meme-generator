var gCanvas = document.querySelector('#meme-canvas');
var gCtx = gCanvas.getContext('2d');
var elTextBox = document.querySelector('#text-line');
var gCurrImg;

/* POSITION EVENTS */
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var isDown = false;
var currPosDown;
var currGrabbedElement;
var movedAxisX = 0;
var movedAxisY = 0;


function renderCanvas() {
    gCtx.fillStyle = "#ffecec";
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    addListeners()
    drawImg();
    drawText();
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

function onAddSticker(elLi) {
    addSticker(elLi);
    gCurrLineTxt = '';
    elTextBox.value = '';
    renderCanvas()
}

function drawImg() {
    var img = new Image();
    img.src = gCurrUrl;
    gCurrImg = img;
    var size = resizePicture(img);
    if (gUploadedImgSrc) {
        img.onload = function() {
            gCtx.drawImage(img, 0, 0, size.x, size.y);
            gUploadedImgSrc = '';
        }
    } else gCtx.drawImage(img, 0, 0, size.x, size.y);
}

function drawText() {
    let idx = 0;
    return gMeme.lines.map(function(line) {
        gCtx.textAlign = line.align;
        gCtx.textBaseline = 'middle';
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = line.color;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.strokeColor;

        if (idx === 0) {
            gCtx.fillText(line.txt, 60 + line.position.x, 40 + line.position.y);
            gCtx.strokeText(line.txt, 60 + line.position.x, 40 + line.position.y);
            gCtx.strokeStyle = "black";
            if (line.isFocused === true && line.txt.length > 0) {
                gCtx.strokeRect(50 + line.position.x, 10 + line.position.y, 25 * (line.txt.length + 2), 50 + line.size / 2);
            }
            line.position.width = 25 * (line.txt.length + 2);
            line.position.height = 50 + line.size / 2;
            line.position.basicPos = { x: 60 + line.position.x, y: 40 + line.position.y }
        } else if (idx === 1) {
            gCtx.fillText(line.txt, 60 + line.position.x, 440 + line.position.y);
            gCtx.strokeText(line.txt, 60 + line.position.x, 440 + line.position.y);
            gCtx.strokeStyle = "black";
            if (line.isFocused === true && line.txt.length > 0) {
                gCtx.strokeRect(50 + line.position.x, 410 + line.position.y, 25 * (line.txt.length + 2), 50 + line.size / 2);
            }
            line.position.width = 25 * (line.txt.length + 2);
            line.position.height = 50 + line.size / 2;
            line.position.basicPos = { x: 50 + line.position.x, y: 420 + line.position.y };
        } else {
            gCtx.fillText(line.txt, 60 + line.position.x, 240 + line.position.y);
            gCtx.strokeText(line.txt, 60 + line.position.x, 240 + line.position.y);
            gCtx.strokeStyle = "black";
            if (line.isFocused === true && line.txt.length > 0) {
                gCtx.strokeRect(50 + line.position.x, 210 + line.position.y, 25 * (line.txt.length + 2), 50 + line.size / 2);
            }
            line.position.width = 25 * (line.txt.length + 2);
            line.position.height = 50 + line.size / 2;
            line.position.basicPos = { x: 50 + line.position.x, y: 210 + line.position.y };
        }
        console.log(gMeme.lines);
        idx++;
    })
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchdown', onDown)
    gCanvas.addEventListener('touchup', onUp)
}

function onDown(ev) {
    ev.preventDefault();
    currPosDown = getEvPos(ev);
    var currLineDownIdx = grabLineIdx(currPosDown)
    if (currLineDownIdx !== -1) {
        gMeme.lines[currLineIdx].isFocused = false;
        currLineIdx = currLineDownIdx;
        gMeme.lines[currLineIdx].isFocused = true;
        currGrabbedElement = currLineDownIdx;
        isDown = true;
        renderCanvas();
    }
}

function onMove(ev) {
    ev.preventDefault()
    if (!isDown) return
    var currMovedPos = getEvPos(ev);
    console.log(currMovedPos.x + ',' + currMovedPos.y);
    if (currMovedPos.x >= gCanvas.width - 5 ||
        currMovedPos.x <= 5 ||
        currMovedPos.y >= gCanvas.height - 5 ||
        currMovedPos.y <= 5) return isDown = false;
    movedAxisX = currMovedPos.x - currPosDown.x;
    gMeme.lines[currGrabbedElement].position.x += movedAxisX;
    movedAxisY = currMovedPos.y - currPosDown.y;
    gMeme.lines[currGrabbedElement].position.y += movedAxisY;
    currPosDown = currMovedPos;
    renderCanvas();
}

function onUp() {
    isDown = false;
    movedAxisX = 0;
    movedAxisY = 0;
    // currGrabbedElement = -1;
    // renderCanvas();
}

function grabLineIdx(ev) {
    var idx = gMeme.lines.findIndex(function(line) {
        return (ev.x > line.position.basicPos.x - 10 &&
            ev.x < line.position.width + line.position.basicPos.x + 10 &&
            ev.y > line.position.basicPos.y - 30 &&
            ev.y < line.position.height + line.position.basicPos.y + 30);
    })
    console.log(idx);
    return idx;
}

function getEvPos(ev) {
    const rect = gCanvas.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    var pos = {
        x: x,
        y: y
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos;
}

function resizePicture(img) {
    var width = 0;
    var height = 0;
    var size;

    if (img.width > img.height) {
        width = gCanvas.width;
        height = (gCanvas.height * img.width) / img.width;
    } else if (img.height > img.width) {
        width = (gCanvas.width * img.width) / img.height;
        height = gCanvas.height;
    } else {
        width = gCanvas.width;
        height = gCanvas.height
    }
    size = { x: width, y: height };
    return size;
}


// function scaleToFit(img) {
//     var scale = Math.min(gCanvas.width / img.width, gCanvas.height / img.height);
//     var x = (gCanvas.width / 2) - (img.width / 2) * scale;
//     var y = (gCanvas.height / 2) - (img.height / 2) * scale;
//     return (img, x, y, img.width * scale, img.height * scale);
// }