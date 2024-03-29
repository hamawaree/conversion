const fs = require('fs');
const hiragana2romaji = require("./hiragana2romaji.js").default;

const jsonObject = JSON.parse(fs.readFileSync('./Gictionary.json', 'utf8'));
const result = [];


jsonObject.pages.forEach((obj) => {
    delete obj.created;
    delete obj.updated;
    delete obj.id;

    // ひらがなで開始する行のみにする
    const regex = new RegExp("^[ぁ-ん]");
    obj.kana = obj.lines.filter((value) => regex.test(value));
    
    
    for(i = 0 ; i < obj.kana.length ; i++ ){
        // 空白を削除
        if(obj.kana[i]==""){
            obj.kana.splice(i,1);
        }

        // スペースがあった場合、スペースの位置以降を削除
        if(obj.kana[i].indexOf(' ') !== -1){
            obj.kana[i] = obj.kana[i].slice(0,obj.kana[i].indexOf(' '))
        }
    }

    // 重複を削除
    obj.kana = obj.kana.filter((element, index) => obj.kana.indexOf(element) === index);

    delete obj.lines;

    // romanを作る
    obj.roman = JSON.parse(JSON.stringify(obj.kana));
    for(i = 0 ; i < obj.roman.length ; i++ ){
        obj.roman[i] = hiragana2romaji(obj.roman[i]);
    }

    result.push(obj);
});

// Object.keys(result).forEach((obj)=>{
//     console.log(obj);
// });

fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));