const validKeyWords = ["all", "politic", "funny", "cute", "dog", "baby", "sleep", "cat", "boy", "child", "angry", "surprise", "cool", "smile", "laugth", "fight", "akward", "israel", "serious", "movie", "russia", "kids", "cartoon"]
const STORAGE_KEY = 'meme_DB';
const STORAGE_KEYWORDS = 'keywords_DB';
var gFilterKeyword = 'all';
var gKewordSearchCountMap;

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
    }
];

var gSavedImg = [];

function renderKeyWords() {
    gKewordSearchCountMap = loadFromStorage(STORAGE_KEYWORDS);
    if (!gKewordSearchCountMap || gKewordSearchCountMap.length === 0) {
        gKewordSearchCountMap = [{
            key: 'all',
            count: 20
        }]
    }
    var strHTMLs = '<ul>';
    gKewordSearchCountMap.forEach(function(obj) {
        console.log(obj);
        return strHTMLs +=
            `<li id=${obj.key} onclick="filterGalleryBy(this.id)" style="font-size: ${obj.count+30}px; color: ${getRandomColor()}; cursor: pointer; text-align: center">${obj.key} </li>`
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

        var checkIfExist = gKewordSearchCountMap.findIndex(function(obj) {
            return obj.key === word;
        })
        if (checkIfExist == -1) {
            gKewordSearchCountMap.push({
                key: word,
                count: 1
            });
        } else gKewordSearchCountMap[checkIfExist].count += 1;
    }
    _saveKeyWordsToStorage()
    renderImgs();
}

function _saveKeyWordsToStorage() {
    saveToStorage(STORAGE_KEYWORDS, gKewordSearchCountMap)
}