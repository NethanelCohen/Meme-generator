var gCanvas;
var gCtx;
var elTextBox = document.querySelector('#text-line');

/* POSITION EVENTS */
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var isDown = false;
var currPosDown;
var currGrabbedElement;
var movedAxisX = 0;
var movedAxisY = 0;


function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
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
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
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
    currPosDown = getEvPos(ev);
    console.log("currPosDown: ", currPosDown);
    var currLineDownIdx = grabLineIdx(currPosDown)
    console.log("currLineDownIdx: ", currLineDownIdx);
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
    if (!isDown) return
    var currMovedPos = getEvPos(ev);
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
        // debugger
        return (ev.x > line.position.basicPos.x &&
            ev.x < line.position.width + line.position.basicPos.x &&
            ev.y > line.position.basicPos.y &&
            ev.y < line.position.height + line.position.basicPos.y);
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