window.addEventListener('load', () => {
    // 変換後データの例
    let json = [
        ["きょう",["今日","きょう","教","強","凶"]],
        ["の",["の","之","野","ノ","盧"]],
        ["てんき",["天気","転機","転記","てんき","☀"]],
        ["は",["は","派","葉","歯","刃"]],
        ["はれ",["晴れ","晴","腫れ","はれ","ハレ"]],
        ["です。",["です。","デス。","ﾃﾞｽ｡"]]
    ];


    // 変換結果を管理する配列
    // 例: 'arr[0] = 3'は0番目のデータの変換結果は3番目ということを表す
    let arr = [];
    for (let i = 0; i < json.length; i++){
        // 0 で初期化(一番最初の変換候補をとりあえず表示)
        arr[i] = 0; 
    }

    const appdata = {
        data() {
            return{
                displayConvWindowFlg: false,
                hoverIndex: 0,
                convWindowPositionX: 0,
                convWindowPositionY: 0,
                convResultArray: json,
                convIndex: arr,

                // 修正窓関係
                displayFixWindowFlg: false,
                fixWindowPositionX: 0,
                fixWindowPositionY: 0,

                // 前回の変換の文字数
                prevLength: 0
            }
        },
        methods: {
            // 変換窓を表示(マウスオーバーで呼び出し)
            displayConvWindow(index){
                this.displayConvWindowFlg = true;
                this.displayFixWindowFlg = false;
                this.hoverIndex = index;


                // ホバーしたアイテムの座標を取得
                var target_id = "target" + index;
                var element = document.getElementById(target_id);
                var clientRect = element.getBoundingClientRect();

                // ページの左端から、要素の左端までの距離
                this.convWindowPositionX = window.pageXOffset + clientRect.left -10;
                
                // ページの上端から、要素の上端までの距離
                this.convWindowPositionY = window.pageYOffset + clientRect.top - 65;
                
            },

            // 打ち間違い修正窓を表示(クリックで呼び出し)
            displayFixWindow(index){
                this.displayFixWindowFlg = true;
                this.displayConvWindowFlg = false;
                this.hoverIndex = index;


                // ホバーしたアイテムの座標を取得
                var target_id = "target" + index;
                var element = document.getElementById(target_id);
                var clientRect = element.getBoundingClientRect();

                // ページの左端から、要素の左端までの距離
                this.fixWindowPositionX = window.pageXOffset + clientRect.left -10;
                
                // ページの上端から、要素の上端までの距離
                this.fixWindowPositionY = window.pageYOffset + clientRect.top - 65;
                
            },

            release(){
                this.displayConvWindowFlg = false;
                this.displayFixWindowFlg = false;
            },
            change(hoverIndex, index){
                this.convIndex[hoverIndex] = index;
            },

            // 
            convert(){
                var toHiragana = romajiConv.toHiragana;
                let textInput = document.getElementById("textInput");
                let romaji = textInput.value;

                //入力欄の文字を消す
                textInput.value = "";

                // ローマ字をひらがなに変換
                let kana = toHiragana(romaji);

                // ひらがな文に含まれる空白にカンマを追加
                let kana_comma = kana.replace(/\s+/g, ",");

                let URL = 'https://www.google.com/transliterate?langpair=ja-Hira|ja&text=' + kana_comma;
                this.prevLength = this.convResultArray.length;

                fetch(URL)
                    .then(response => response.text())
                    .then(data => {
                        // ここにURLのデータを取得した時の処理

                        json = JSON.parse(data)

                        // 変換結果として得られた配列jsonをこれまでの変換結果と結合する
                        this.convResultArray = [...this.convResultArray, ...json]

                        for (let i = this.prevLength; i < this.convResultArray.length; i++){
                            // 0 で初期化(一番最初の変換候補をとりあえず表示)
                            this.convIndex[i] = 0; 
                        }
                    });
            }
        }
    }

    let app = Vue.createApp(appdata)
    app.mount('#app')
});