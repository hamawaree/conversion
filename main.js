window.addEventListener('load', () => {
    // 変換後データの例
    let json = [
        ["kyou",["今日","きょう","教","強","凶"]],
        ["no",["の","之","野","ノ","盧"]],
        ["tenki",["天気","転機","転記","てんき","☀"]],
        ["ha",["は","派","葉","歯","刃"]],
        ["hare",["晴れ","晴","腫れ","はれ","ハレ"]],
        ["desu.",["です。","デス。","ﾃﾞｽ｡"]]
    ];

    // 変換結果を管理する配列
    // 例: 'arr[0] = 3'は0番目のデータの変換結果は3番目ということを表す
    let arr = [];
    for (let i = 0; i < json.length; i++){
        // 0 で初期化(一番最初の変換候補をとりあえず表示)
        arr[i] = 0; 
    }

    function dl_search(text){
        let return_arr = [text+" searched1",text+" searched2",text+" searched3"];
        return return_arr;
    }


    const appdata = {
        data() {
            return{
                // 対象の文節の位置を管理
                selectedTargetIndex: 0,

                // 変換窓関係
                displayConvWindowFlg: false,
                convWindowPositionX: 0,
                convWindowPositionY: 0,
                convResultArray: json,
                convIndex: arr,

                // 修正窓関係
                displayFixWindowFlg: false,
                fixWindowPositionX: 0,
                fixWindowPositionY: 0,
                fixCandidateArray:[],

                // 前回の変換の文字数
                prevLength: 0
            }
        },
        methods: {
            // 変換窓を表示(マウスオーバーで呼び出し)
            displayConvWindow(index){
                this.displayConvWindowFlg = true;
                this.displayFixWindowFlg = false;
                this.selectedTargetIndex = index;


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
                this.selectedTargetIndex = index;

                // テスト用の修正候補の配列
                this.fixCandidateArray = ["候補1","候補2","候補3","候補4"]

                // dl_serchにわたす値を出す
                console.log(this.convResultArray[index][0]);
                let fixTargetRoman = this.convResultArray[index][0];
                this.fixCandidateArray = dl_search(fixTargetRoman);


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
            changeConv(selectedTargetIndex, index){
                this.convIndex[selectedTargetIndex] = index;
            },

            // 「変換」ボタンを押したとき呼び出し
            convert(){
                let toHiragana = romajiConv.toHiragana;
                let textInput = document.getElementById("textInput");
                let romaji = textInput.value;

                //入力欄の文字を消す
                textInput.value = "";

                // ローマ字をスペース区切りで配列に格納
                let romaji_arr = romaji.split(/\s/);

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
                        for (let i = 0; i<json.length; i++){
                            json[i][0] = romaji_arr[i];
                        }

                        // 変換結果として得られた配列jsonをこれまでの変換結果と結合する
                        this.convResultArray = [...this.convResultArray, ...json];
                        console.log(this.convResultArray);

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