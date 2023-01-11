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

                // let filtered = dictionary.filter(word => word.title.length > 10);
                let regex = new RegExp(this.textInput);
                let filteredRoman

                dictionary.forEach((obj)=>{
                    obj.roman_found = obj.roman.find(arr => arr.match(regex))
                    if(obj.roman_found){
                        console.log(obj);
                    }
                });

                let filtered = dictionary.filter(obj => obj.roman_found);
                // let filtered = fiter_befor.filter(word => word.roman.match(regex));
                // let filtered = dictionary.filter(word => word.title.match(regex));

                console.log(filtered);

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