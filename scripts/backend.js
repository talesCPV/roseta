function saveFile(file,path,filename=''){
    const data = new URLSearchParams()
        data.append("file", JSON.stringify(file))
        data.append("path", path)
        data.append("filename", filename)

    const myRequest = new Request("backend/saveFile.php",{
        method : "POST",
        body : data
    })

    return new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) {                 
                resolve(response.text())
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"))
            } 
        })
    })
}

function delFile(path){
    const data = new URLSearchParams()
        data.append("path", path)
    const myRequest = new Request("backend/delFile.php",{
        method : "POST",
        body : data
    })

    return new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) {                 
                resolve(response.text())
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"))
            } 
        })
    })
}

function renameFile(old_name,new_name){
    const data = new URLSearchParams()
        data.append("old_name", old_name)
        data.append("new_name", new_name)
    const myRequest = new Request("backend/renameFile.php",{
        method : "POST",
        body : data
    })

    return new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) {                 
                resolve(response.text())
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"))
            } 
        })
    })
}

function loadFile(path){
    const data = new URLSearchParams()
        data.append("path", path)
    const myRequest = new Request("backend/loadFile.php",{
        method : "POST",
        body : data
    })

    return new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) {                 
                resolve(response.text())
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"))
            } 
        })
    })
}

function showFiles(path){
    const data = new URLSearchParams()
        data.append("dir", path)
    const myRequest = new Request("backend/showFiles.php",{
        method : "POST",
        body : data
    })

    return new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) {                 
                resolve(response.text())
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"))
            } 
        })
    })
}

function loadObjects(){
    return loadFile('/../../roseta_files/config/object.json')
    .then(text=>{
        try{
            main_data.objects = JSON.parse(text)
            document.querySelector('#btn-new-colec').disabled = 0
        }catch{
            console.log('Arquivo de padrões não encontrado!')
        }
    })
}

function loadUserFiles(user_id){
    loadObjects()
    enableFields(0)
    document.querySelector('#cmb-colecoes').innerHTML = ''
    main_data.colecoes = []

    async function addRegisters(json){
        let i=2
        while(i<json.length){
            await fetch(`../roseta_files/${user_id}/${json[i]}`, 
                {
                    cache: 'no-store'
                })
            .then( stream =>stream.text())
            .then( text => {
                const obj = new Roseta
                obj.importJSON(JSON.parse(text))
                obj.file = json[i]
                addColecao(obj)
                i++
            })
        }
    }

    showFiles(`../roseta_files/${user_id}/`).then((resolve)=>{
        const json = JSON.parse(resolve)
        addRegisters(json)          
    })

}

function saveBinaryFile(bytes, fileName, mimeType = 'application/octet-stream') {
    // 1. Create a Blob object from the binary data
    const blob = new Blob([bytes], { type: mimeType });
  
    // 2. Generate a temporary local URL pointing to the Blob
    const blobUrl = URL.createObjectURL(blob);
  
    // 3. Create a hidden anchor element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
  
    // 4. Append to the DOM, trigger the download click, and clean up
    this.document.body.appendChild(link);
    link.click();
    
    // 5. Free up memory and remove the element
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }