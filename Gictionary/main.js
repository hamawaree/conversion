window.addEventListener('load', () => {
    const appdata = {
        data() {
            return{
                textInput: "",
                result:[],
                dl_result: []
            }
        },
        methods: {
            search(){
                let regex = new RegExp(this.textInput);
 
                dictionary.forEach((obj)=>{
                    obj.roman_found = obj.roman.find(arr =>arr.match(regex))
                });

                let filtered = dictionary.filter(obj => obj.roman_found);

                // 前の検索結果を削除
                this.result.splice(0)

                // 検索結果を格納
                if (filtered.length <= 10){
                    for(i=0;i<filtered.length;i++){
                        this.result[i] = filtered[i].title;
                    }
                }else{
                    for(i=0;i<10;i++){
                        this.result[i] = filtered[i].title;
                    }
                }
            },
            dlTest(){
                console.log(distance(this.textInput, "sato"));
                dictionary.forEach((obj)=>{
                    obj.dl_found = obj.roman.find(word => distance(this.textInput,word) <= 1)
                });

                let filtered = dictionary.filter(obj => obj.dl_found);

                // 前の検索結果を削除
                this.dl_result.splice(0)

                // レーベンシュタインの結果を格納
                for(i=0;i<filtered.length;i++){
                    this.dl_result[i] = filtered[i].title;
                }
            }
        }
    }

    let app = Vue.createApp(appdata)
    app.mount('#app')
});