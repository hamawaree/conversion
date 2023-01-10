const fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('./Gictionary.json', 'utf8'));
const result = [];


jsonObject.pages.forEach((obj) => {
    delete obj.created;
    delete obj.updated;
    delete obj.id;

    // ひらがなで開始する行のみにする
    const regex = new RegExp("^[ぁ-ん]");
    obj.kana = obj.lines.filter((value) => regex.test(value));
    
    // スペース以降を削除
    for(i = 0 ; i < obj.kana.length ; i++ ){
        if(obj.kana[i]==""){
            obj.kana.splice(i,1);
        }
        obj.kana[i] = obj.kana[i].slice(0,obj.kana[i].indexOf(' '))
    }

    // 重複を削除
    obj.kana = obj.kana.filter((element, index) => obj.kana.indexOf(element) === index);

    delete obj.lines;

    result.push(obj);
});

// Object.keys(result).forEach((obj)=>{
//     console.log(obj);
// });

fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));