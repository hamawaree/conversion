window.addEventListener('load', () => {

    const appdata = {
        data() {
            return{
                textInput: "",
                result:[]
            }
        },
        methods: {
            search(){
                let regex = new RegExp(this.textInput);

                dictionary.forEach((obj)=>{
                    obj.roman_found = obj.roman.find(arr => arr.match(regex))
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

                console.log(this.result);
            }
        }
    }

    let app = Vue.createApp(appdata)
    app.mount('#app')
});