window.addEventListener('load', () => {

    const appdata = {
        data() {
            return{
                textInput: ""
            }
        },
        methods: {
            search(){
                alert(this.textInput);
                console.log(this.textInput);
            }
        }
    }

    let app = Vue.createApp(appdata)
    app.mount('#app')
});