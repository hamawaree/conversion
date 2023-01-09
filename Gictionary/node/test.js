const fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('./Gictionary.json', 'utf8'));
const result = [];


jsonObject.pages.forEach((obj) => {
    delete obj.created;
    delete obj.updated;
    delete obj.id;

    // ひらがなで開始する行のみにする
    const regex = new RegExp("^[ぁ-ん]");
    obj.lines = obj.lines.filter((value) => regex.test(value));
    
    for(i = 0 ; i < obj.lines.length ; i++ ){
        if(obj.lines[i]==""){
            obj.lines.splice(i,1);
        }
        obj.lines[i] = obj.lines[i].slice(0,obj.lines[i].indexOf(' '))
    }

    result.push(obj);
});

// Object.keys(result).forEach((obj)=>{
//     console.log(obj);
// });

fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));