var elMemeModal = document.querySelector('.meme-generator');

function onInit() {
    renderImgs()
    renderMemes()
    renderCanvas()
}

function renderImgs() {
    var strHTMLs = '';
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
}

function renderMemeGen(meme) {
    gMeme.selectedImgId = meme.id;
    var currImg = getMemeById(meme.id);
    gCurrUrl = currImg.url;
    renderCanvas()
    toggleModal();
}

function getMemeById(memeId) {
    const meme = gImgs.find(function(img) {
        return img.id === +memeId;
    });
    return meme;
}

function toggleModal() {
    if (elMemeModal.classList.contains('open')) {
        elMemeModal.classList.replace('open', 'close');
    } else {
        elMemeModal.classList.replace('close', 'open');
    }
}