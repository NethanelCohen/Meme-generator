var isMoreKeysOpen;
var elMemeModal = document.querySelector('.meme-generator');
var elGallery = document.querySelector('.gallery-botton');
var elSaved = document.querySelector('.saved-botton');
var elFilter = document.querySelector('.filter-by');

function onInit() {
    renderImgs()
    renderMemes()
    renderCanvas()
    renderKeyWords()
    isMoreKeysOpen = true;
    if (gUploadedImgSrc) toggleModal();
    switchFocus('gallery');
}

function renderImgs() {
    if (elGallery.classList.contains('active')) {
        var strHTMLs = `<div class="meme">
                <input type="file" class="upload">
                <img id="load-image" src="img/icons/upload.png" width="500" height="500">
                </div>`;
    } else var strHTMLs = '';
    var filteredImg = gImgs.filter(function(img) {
        return img.keywords.find(function(keyword) {
            return keyword.includes(gFilterKeyword)
        })
    })
    filteredImg.forEach(function(img) {
        return strHTMLs += `
        <div class="meme" id="${img.id}" onclick="renderMemeGen(this)">
        <img src="${img.url}">
        </div>`
    })
    var elImgs = document.querySelector('.memes-wrapper');
    elImgs.innerHTML = strHTMLs;
    renderKeyWords();
}

function renderMemeGen(meme) {
    // debugger
    if (gUploadedImgSrc) {
        gCurrUrl = gUploadedImgSrc.src
        renderCanvas();
        toggleModal();
        return
    } else {
        gMeme.selectedImgId = meme.id;
        var currImg = getMemeById(meme.id);
        gCurrUrl = currImg.url;
        renderCanvas();
        toggleModal();
    }
}

function getMemeById(memeId) {
    const meme = gImgs.find(function(img) {
        return img.id === +memeId;
    });
    return meme;
}

function displayText() {
    gMeme.lines[currLineIdx].txt = '';
    elTextBox.value = '';
}

function switchFocus(tab) {
    if (tab === 'gallery') {
        elGallery.classList.add('active');
        elSaved.classList.remove('active');
        elFilter.classList.remove('hide-filter');
    } else {
        elGallery.classList.remove('active')
        elSaved.classList.add('active');
        elFilter.classList.add('hide-filter');
    }
}