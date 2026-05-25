function saveFile(file,path){
    const data = new URLSearchParams();
        data.append("file", JSON.stringify(file));
        data.append("path", path);
    const myRequest = new Request("backend/saveRST.php",{
        method : "POST",
        body : data
    });

    return new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) {                 
                resolve(response.text());                    
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"));                    
            } 
        });
    }); 

}