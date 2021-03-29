let uploadUrl = null;
const getLink = async () => {
    let promise = await fetch('https://uptobox.com/api/upload', {
        method: 'GET'
    });
    let response = await promise.json();
    uploadUrl = response.data.uploadLink;

}

const upladFile = async (files) => {
    await getLink();

    for (let i in files) {
        let form = new FormData();
        form.append('files', files[i]);

        let promise = await fetch(uploadUrl, {
            method: 'POST',
            body: form
        });

        let response = await promise.json();
        let spanitem = document.createElement('span');
        spanitem.innerHTML = response.files[0].url + '<br>';
        responseDiv.append(spanitem);
    }

}

let fileInput = document.getElementById('mymp3');
let responseDiv = document.getElementById('response');

fileInput.addEventListener('change', async (e) => {
    let files = fileInput.files;
    if (files.length > 0) {
        await upladFile(files);
    }
});

