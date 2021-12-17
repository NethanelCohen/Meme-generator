function _makeId(length = 5) {
    const possible = '0123456789';
    var number = '';
    for (var i = 0; i < length; i++) {
        number += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return +number;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}