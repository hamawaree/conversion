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
                // alert(dictionary[1].title);

                for(i=0;i<5;i++){
                    this.result[i] = dictionary[i].title;
                }
                console.log(this.result);
            }
        }
    }

    let app = Vue.createApp(appdata)
    app.mount('#app')
});