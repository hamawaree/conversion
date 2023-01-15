// テストコード
const readline = require("readline");
const hiragana2romaji = require("./hiragana2romaji").default;

readline
	.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	.on("line", (line) =>
	{
		console.log(hiragana2romaji(line));
	});