var elMemeModal = document.querySelector('.meme-generator');
var isMoreKeysOpen;

function onInit() {
    renderImgs()
    renderMemes()
    renderCanvas()
    renderKeyWords()
    isMoreKeysOpen = true;
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
    renderKeyWords();
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

function displayText() {
    gMeme.lines[currLineIdx].txt = '';
    elTextBox.value = '';
}

/* service */
function toggleModal() {
    if (elMemeModal.classList.contains('open')) {
        elMemeModal.classList.replace('open', 'close');
    } else {
        elMemeModal.classList.replace('close', 'open');
    }
    displayText()
    renderMemes()
}

/* service */
function toggleMoreKeysOpen() {
    isMoreKeysOpen = !isMoreKeysOpen;
    var elMore = document.querySelector('.keywords-query');
    var elBtn = document.querySelector('.toggle-btn');
    if (isMoreKeysOpen) {
        elMore.style.height = "150px"
        elBtn.innerText = '▽'
    } else {
        elMore.style.height = "500px";
        elBtn.innerText = '△'
    }
}