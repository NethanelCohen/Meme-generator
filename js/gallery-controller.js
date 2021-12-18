var isMoreKeysOpen;
var elMemeModal = document.querySelector('.meme-generator');

function onInit() {
    renderImgs()
    renderMemes()
    renderCanvas()
    renderKeyWords()
    isMoreKeysOpen = true;
    if (gUploadedImgSrc) toggleModal();
    document.querySelector('.filter-by').classList.remove('hide-filter');
    switchFocus('gallery');
}

function renderImgs() {
    var strHTMLs = `<div class="meme">
    <input type="file" class="upload">
    <img id="load-image" src="img/icons/upload.png" width="500" height="500">
    </div>`;
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
        document.querySelector('.gallery-botton').classList.add('active');
        document.querySelector('.saved-botton').classList.remove('active');
    } else {
        document.querySelector('.gallery-botton').classList.remove('active')
        document.querySelector('.saved-botton').classList.add('active');
    }
}