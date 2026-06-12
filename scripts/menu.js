/* MENU */

document.querySelector('#menu-import-csv').addEventListener('click',()=>{
    openHTML('load_file',{"accept":".csv","callback": openCSV},[500,0])
})

document.querySelector('#menu-categoria').addEventListener('click',()=>{
    openHTML('view_object',{},[600,0])
})

document.querySelector('#menu-padroes').addEventListener('click',()=>{
    openHTML('view_defaults',{},[600,0])
})

/* DOM */

document.querySelector('#cmb-colecoes').addEventListener('click',()=>{
    try{
        const sel = document.querySelector('#cmb-colecoes')
        const option = sel.options[sel.selectedIndex]
        about(option.data)
        enableFields()  
    }catch{
        enableFields(0)
    }
})

document.querySelector('#about-show').addEventListener('click',()=>{
    const roseta = document.querySelector('.registros').data
    if(roseta != undefined){
        openHTML('view_collection',roseta)
    }
})

document.querySelector('#about-del').addEventListener('click',()=>{
    const roseta = document.querySelector('.registros').data
    if(roseta != undefined){
        if(confirm('Deseja excluir esta coleção?')){
            delColecao(roseta)
        }
    }
})

document.querySelector('#about-clone').addEventListener('click',()=>{
    const roseta = document.querySelector('.registros').data
    if(roseta != undefined){
        const filename = prompt('Digite um novo nome:')+'.rst'
        if(filename!=null){
            const index = findColecao(filename)
            if(index<0){
                const newOne = roseta.cloneCollection()
                newOne.editCollection('file',filename)
                addColecao(newOne)           
                saveColecao(findColecao(filename))
            }else{
                alert('Já existe um arquivo com este nome!')
            }
        }
    }
})

document.querySelector('#about-edit-file').addEventListener('click',()=>{
    const file = prompt('Nome do arquivo:',document.querySelector('#about-file').innerHTML)
    if(file!=null){
        const index = findColecao(document.querySelector('.registros').data.file)
        renameFile(`/../files/${main_data.user_id}/${main_data.colecoes[index].file}`,`/../files/${main_data.user_id}/${file}`)
        .then(()=>{
            editColecao(index,'file',file)
            .then(()=>{
                document.querySelector('#about-file').innerHTML = file
                document.querySelector('#cmb-colecoes').options[index].innerHTML = file
            })
        })
    }
})

document.querySelector('#about-edit-nome').addEventListener('click',()=>{
    const name = prompt('Digite o nome da coleção:',document.querySelector('#about-nome').innerHTML)
    if(name!=null){
        const index = findColecao(document.querySelector('.registros').data.file)
        editColecao(index,'name',name)
        .then(()=>{
            document.querySelector('#about-nome').innerHTML = name
        })
    }
})

document.querySelector('#about-edit-categoria').addEventListener('click',()=>{
    const categoria = prompt('Tipo de Coleção:(ex: Obra de Arte, Revista, etc)',document.querySelector('#about-categoria').innerHTML)
    if(categoria!=null){
        const index = findColecao(document.querySelector('.registros').data.file)
        editColecao(index,'categoria',categoria)
        .then(()=>{
            document.querySelector('#about-categoria').innerHTML = categoria
        })
    }
})

document.querySelector('#btn-new-colec').addEventListener('click',()=>{
    openHTML('new_collection',{},[400,0])
})

document.querySelector('#about-novo-campo').addEventListener('click',()=>{
    const param = new Object
    param.new = 1
    param.callback = editField
    openHTML('new_field',param,[500,0])
})

document.querySelector('#about-novo-objeto').addEventListener('click',()=>{
    const param = new Object
    param.callback = (response)=>{
        response.default.file = document.querySelector('.registros').data.file
        editField(response)
    }
    
    openHTML('new_object',param,[500,0])
})

document.querySelector('#about-fields').addEventListener('click',()=>{
    const sel = document.querySelector('#about-fields')
    const opt = sel.options[sel.selectedIndex]
    const param = new Object
    param.key = opt.name
    param.value = opt.data
    param.new = 0
    param.callback = editField
    openHTML('new_field',param,[500,0])
})

function editField(response){
    const index = findColecao(document.querySelector('.registros').data.file)
    main_data.colecoes[index].editField(response)
    about(main_data.colecoes[index])
    saveColecao(index)
}