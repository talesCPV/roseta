function saveFile(file,path){
    const data = new URLSearchParams()
        data.append("file", JSON.stringify(file))
        data.append("path", path)
    const myRequest = new Request("backend/saveRST.php",{
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

function loadUserFiles(user_id){
    enableFields(0)
    document.querySelector('#cmb-colecoes').innerHTML = ''
    main_data.colecoes = []

    showFiles(`files/${user_id}/`).then((resolve)=>{
        const json = JSON.parse(resolve)
        for(let i=2; i<json.length; i++){
            fetch(`files/${user_id}/${json[i]}`)
            .then( stream => stream.text())
            .then( text => {
                const obj = new Roseta
                obj.importJSON(JSON.parse(text))
                addColecao(obj)
            })
        }
    })

}