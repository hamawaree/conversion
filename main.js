let data = '[["きょう",["今日","きょう","教","強","凶"]],["の",["の","の","ノ","ﾉ"]],["てんき",["天気","天気","てんき","テンキ","ﾃﾝｷ"]],["は",["は","は","ハ","ﾊ"]],["はれ",["晴れ","晴れ","はれ","ハレ","ﾊﾚ"]],["です。",["です。","です。","デス。","ﾃﾞｽ｡"]]]'
let json = JSON.parse(data)

// 変換結果を管理する配列
// arr[0] = 3 → 0番目のデータの変換結果は3番目
let arr = [];
for (let i = 0; i < json.length; i++){
    // 0 で初期化(一番最初の変換候補をとりあえず表示)
    arr[i] = 0; 
}

const appdata = {
    data() {
        return{
            message: 'hoverしてください',
            hoverFlag: false,
            hoverIndex: 0,
            convWindowPositionX: 0,
            convWindowPositionY: 0,
            convResult: json,
            convIndex: arr
        }
    },
    methods: {
        // 変換窓を表示(マウスオーバーで呼び出し)
        displayConvWindow(index){
            this.hoverFlag = true
            this.hoverIndex = index

            console.log("length: " + this.convResult.length);


            // ホバーしたアイテムの座標を取得
            var target_id = "target" + index;
            console.log(target_id);
            var element = document.getElementById(target_id);
            var clientRect = element.getBoundingClientRect();

            // ページの左端から、要素の左端までの距離
            this.convWindowPositionX = window.pageXOffset + clientRect.left -10;
            
            // ページの上端から、要素の上端までの距離
            this.convWindowPositionY = window.pageYOffset + clientRect.top;
            
        },
        release(){
            this.hoverFlag = false
        },
        change(hoverIndex, index){
            this.convIndex[hoverIndex] = index
        },

        // init テスト
        init(){
            let romaji = romajiConv(document.getElementById("roman").value);

            //入力欄の文字を消す
            document.getElementById("roman").value = ""

            // ローマ字をひらがなに変換
            let kana = romaji.toHiragana();

            // ひらがな文に含まれる空白にカンマを追加
            let kana_comma = kana.replace(/\s+/g, ",");

            let URL = 'https://www.google.com/transliterate?langpair=ja-Hira|ja&text=' + kana_comma;

            fetch(URL)
                .then(response => response.text())
                .then(data => {
                    // ここにURLのデータを取得した時の処理
                    json = JSON.parse(data)

                    this.convResult = [...this.convResult, ...json]
                    for (let i = 0; i < this.convResult.length; i++){
                        // 0 で初期化(一番最初の変換候補をとりあえず表示)
                        this.convIndex[i] = 0; 
                    }
                });
        }
    }
}

let app = Vue.createApp(appdata)
app.mount('#app')