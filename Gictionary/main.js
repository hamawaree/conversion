var obj1 = document.getElementById("selfile");

//ダイアログでファイルが選択された時
obj1.addEventListener("change",function(evt){
    
    var file = evt.target.files;
    
    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
    
    //読込終了後の処理
    reader.onload = function(ev){
        //テキストエリアに表示する
        document.test.txt.value = reader.result;
    }
},false);