var  fs = require('fs');
var readline = require('readline');

fs.writeFile('output.html', '<html><head></head><body>', function (err) {
    if (err) throw err;
    console.log('output.html is saved!');
}); //


//dictionary
var dictionaryFile = fs.readFileSync("example/dictionary",'utf8');
var dictionary = (function(dictionaryFile) {
    var result = {};
    var dictionaryArray = dictionaryFile.split('\n');
    dictionaryArray.forEach(function(xyz){
        result[xyz.toLowerCase()] = true;
    });
    return result;
})(dictionaryFile);


//text
var lineReader = readline.createInterface({
    input: fs.createReadStream('example/text', 'utf8')
});



lineReader.on('line', function (line) {
    var data = [];
    var wordBuffer = '';
    for(var i = 0; i < line.length; i++) {
        var letter = line[i];
        //Regular expression
        if (/[\wа-яА-ЯЁё]/.test(letter)) {
            wordBuffer += letter;
        } else {
            if (wordBuffer.length && isInDictionary(wordBuffer, dictionary)){
                wordBuffer = '<b><i>' + wordBuffer + '</i></b>';
            }
            data.push(wordBuffer);
            wordBuffer = '';
            data.push(letter);
        }
    }
    if (wordBuffer.length && isInDictionary(wordBuffer, dictionary)){
        wordBuffer = '<b><i>' + wordBuffer + '</i></b>';
    }

    data.push(wordBuffer);



    fs.appendFile('output.html', data.join('') + '\n');
});

lineReader.on('close', function () {
    fs.appendFile('output.html', '</body></html>');

});

function isInDictionary(word, dictionary){
    return dictionary[word.toLowerCase()];
}



