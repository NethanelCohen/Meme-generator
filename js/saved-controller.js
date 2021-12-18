var gSavedCanvas;
var gSavedCtx;
var gCurrSavedUrl;
var elSavedMemeModal = document.querySelector('.saved-memes')


function renderSavedCanvas() {
    gSavedCanvas = document.querySelector('#saved-memes');
    gSavedCtx = gSavedCanvas.getContext('2d');
    gSavedCtx.fillStyle = "#fcf6f6";
    gSavedCtx.clearRect(0, 0, gSavedCanvas.width, gSavedCanvas.height);
    drawSavedImg()
}

function renderSaved() {
    if (elMemeModal.classList.contains('open')) toggleModal();
    gSavedImg = loadFromStorage(STORAGE_KEY)
    if (!gSavedImg || gSavedImg.length === 0) {
        strHTMLs += '<h2 style="text-align: center; box-shadow: 4px 4px 10px 2px; border: 1px solid black;">When you will save a meme - it will appear here.</h2>'
    } else {
        var strHTMLs = '';
        gSavedImg.forEach(function(img) {
            return strHTMLs += `
            <div class="meme" id="${img.id}" onclick="renderSavedMeme(this.id)">
            <img src="${img.url}">
            </div>`
        })
    }
    var elImgs = document.querySelector('.memes-wrapper');
    elImgs.innerHTML = strHTMLs;
    document.querySelector('.filter-by').classList.add('hide-filter');
    switchFocus('memes')
}

function renderSavedMeme(memeId) {
    const meme = gSavedImg.find(function(img) {
        return img.id === +memeId;
    });
    gCurrSavedUrl = meme.url;
    renderSavedCanvas(meme);
    toggleSavedModal()
}

function drawSavedImg() {
    var img = new Image();
    img.src = gCurrSavedUrl;
    gSavedCtx.drawImage(img, 0, 0, gSavedCanvas.width, gSavedCanvas.height);
}

function downloadSavedMeme(elLink) {
    var imgContent = gSavedCanvas.toDataURL('image/png')
    elLink.href = imgContent
    toggleSavedModal();
}

function deleteSavedMeme() {
    const meme = gSavedImg.findIndex(function(img) {
        return img.url === gCurrSavedUrl;
    });
    gSavedImg.splice(meme, 1);
    _saveMemeToStorage()
    renderSaved();
    toggleSavedModal();
}

function toggleSavedModal() {
    if (elSavedMemeModal.classList.contains('open')) {
        elSavedMemeModal.classList.replace('open', 'close');
    } else {
        elSavedMemeModal.classList.replace('close', 'open');
    }
}