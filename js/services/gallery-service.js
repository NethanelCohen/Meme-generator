const validKeyWords = ["all", "politic", "funny", "cute", "dog", "baby", "sleep", "cat", "boy", "child", "angry", "surprise", "cool", "smile", "laugth", "fight", "akward", "israel", "serious", "movie", "russia", "kids", "cartoon"];
var gUploadedImgSrc = '';
const STORAGE_KEY = 'meme_DB';
const STORAGE_KEYWORDS = 'keywords_DB';
var gFilterKeyword = 'all';
var gKeywordSearchCountMap;

window.addEventListener('load', function() {
    document.querySelector('input[type=file]').addEventListener('change', function() {
        if (this.files[0].type === 'image/png' || this.files[0].type === 'image/jpg') {
            var img = new Image();
            img.src = URL.createObjectURL(this.files[0]);
            gUploadedImgSrc = img;
            gCurrUrl = gUploadedImgSrc.src;
            renderCanvas()
            toggleModal()
        } else alert('This file is not a png / jpg type!');
    })
});

var gImgs = [{
        id: _makeId(),
        url: 'img/1.jpg',
        keywords: ['politic', 'man', 'funny', 'all']
    },
    {
        id: _makeId(),
        url: 'img/2.jpg',
        keywords: ['cute', 'dog', 'all']
    },
    {
        id: _makeId(),
        url: 'img/3.jpg',
        keywords: ['baby', 'dog', 'sleep', 'all']
    },
    {
        id: _makeId(),
        url: 'img/4.jpg',
        keywords: ['cat', 'sleep', 'cute', 'all']
    },
    {
        id: _makeId(),
        url: 'img/5.jpg',
        keywords: ['cute', 'boy', 'child', 'angry', 'all']
    },
    {
        id: _makeId(),
        url: 'img/6.jpg',
        keywords: ['funny', 'man', 'all']
    },
    {
        id: _makeId(),
        url: 'img/7.jpg',
        keywords: ['surprise', 'boy', 'funny', 'all']
    },
    {
        id: _makeId(),
        url: 'img/8.jpg',
        keywords: ['man', 'funny', 'cool', 'all']
    },
    {
        id: _makeId(),
        url: 'img/9.jpg',
        keywords: ['baby', 'funny', 'smile', 'laugth', 'all']
    },
    {
        id: _makeId(),
        url: 'img/10.jpg',
        keywords: ['politic', 'laugth', 'funny', 'all']
    },
    {
        id: _makeId(),
        url: 'img/11.jpg',
        keywords: ['fight', 'akward', 'man', 'all']
    },
    {
        id: _makeId(),
        url: 'img/12.jpg',
        keywords: ['israel', 'serious', 'man', 'all']
    },
    {
        id: _makeId(),
        url: 'img/13.jpg',
        keywords: ['movie', 'man', 'smile', 'all']
    },
    {
        id: _makeId(),
        url: 'img/14.jpg',
        keywords: ['movie', 'man', 'serious', 'all']
    },
    {
        id: _makeId(),
        url: 'img/15.jpg',
        keywords: ['movie', 'man', 'smile', 'all']
    },
    {
        id: _makeId(),
        url: 'img/16.jpg',
        keywords: ['movie', 'laugth', 'funny', 'all']
    },
    {
        id: _makeId(),
        url: 'img/17.jpg',
        keywords: ['russia', 'politic', 'serious', 'all']
    },
    {
        id: _makeId(),
        url: 'img/18.jpg',
        keywords: ['kids', 'movie', 'cartoon', 'all']
    },
    {
        id: _makeId(),
        url: 'img/19.jpg',
        keywords: ['woman', 'inspire', 'all']
    },
    {
        id: _makeId(),
        url: 'img/20.jpg',
        keywords: ['dog', 'cute', 'all']
    }
];

var gSavedImg = [];

function renderKeyWords() {
    gKeywordSearchCountMap = loadFromStorage(STORAGE_KEYWORDS);
    if (!gKeywordSearchCountMap || gKeywordSearchCountMap.length === 0) {
        gKeywordSearchCountMap = [{
            key: 'all',
            count: 60
        }]
    }
    var strHTMLs = '<ul>';
    gKeywordSearchCountMap.forEach(function(obj) {
        console.log(obj);
        return strHTMLs +=
            `<li id=${obj.key} onclick="filterGalleryBy(this.id)" style="font-size: ${obj.count+20}px; color: ${getRandomColor()}; cursor: pointer; text-align: center">${obj.key} </li>`
    });
    strHTMLs += '</li>';
    var elKeywords = document.querySelector('.keywords-query');
    elKeywords.innerHTML = strHTMLs;
}

function filterGalleryBy(filter) {
    if (filter === '') {
        gFilterKeyword = 'all';
    } else {
        gFilterKeyword = filter;
    }
    if (validKeyWords.includes(filter) && filter !== 'all') {
        var keyIdx = validKeyWords.indexOf(filter);
        var word = validKeyWords[keyIdx];

        var checkIfExist = gKeywordSearchCountMap.findIndex(function(obj) {
            return obj.key === word;
        })
        if (checkIfExist == -1) {
            gKeywordSearchCountMap.push({
                key: word,
                count: 1
            });
        } else if (gKeywordSearchCountMap[checkIfExist].count <= 80) {
            gKeywordSearchCountMap[checkIfExist].count += 1;
        }
    }
    _saveKeyWordsToStorage()
    renderImgs();
}

function toggleMoreKeysOpen() {
    isMoreKeysOpen = !isMoreKeysOpen;
    var elMoreKeys = document.querySelector('.keywords-query');
    var elBtn = document.querySelector('.toggle-btn');
    if (isMoreKeysOpen) {
        elMoreKeys.style.height = "150px"
        elBtn.innerText = '▽'
    } else {
        elMoreKeys.style.height = "350px";
        elBtn.innerText = '△'
    }
}

function toggleModal() {
    if (elMemeModal.classList.contains('open')) {
        elMemeModal.classList.replace('open', 'close');
        document.querySelector('.upload').disabled = "";
        gUploadedImgSrc = '';
        gCurrUrl = ''
    } else {
        elMemeModal.classList.replace('close', 'open');
        document.querySelector('.upload').disabled = "true";
    }
    isMoreKeysOpen = false;
    toggleMoreKeysOpen()
    displayText()
    renderMemes()
}

function _saveKeyWordsToStorage() {
    saveToStorage(STORAGE_KEYWORDS, gKeywordSearchCountMap)
}