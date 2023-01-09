window.addEventListener('load', () => {
    const f = document.getElementById('file1');
    f.addEventListener('change', event => {
        let input = event.target;
        if (input.files.length == 0) {
            console.log('No file selected');
            return;
        }
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const pre = document.getElementById('pre1');
            pre.innerHTML = reader.result;
        };
    
        reader.readAsText(file);
    });
});