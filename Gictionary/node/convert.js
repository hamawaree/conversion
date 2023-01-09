// https://qiita.com/usayuki/items/130c9cab7766d2997a7b

const fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('./input.json', 'utf8'));
const result = {};

jsonObject.list.forEach((obj) => {
    result[obj.id] = obj;
});

fs.writeFileSync('./output.json', JSON.stringify(result, null, 2));