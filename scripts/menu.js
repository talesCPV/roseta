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
    const index = findColecao(document.querySelector('.registros').data.file)
    const out = new Object
    out.fields = main_data.colecoes[index].fields
    out.index = -1
    out.callback = (field)=>{
        const fd = field[field.length-1]
        main_data.colecoes[index].addField(fd.name,fd.kind,fd.default,fd.parameters)
        about(main_data.colecoes[index])
        saveColecao(index)
    }
    openHTML('new_field',out,[500,0])
})

document.querySelector('#about-novo-objeto').addEventListener('click',()=>{
    const out = new Object
    out.callback = (obj)=>{
        const index = findColecao(document.querySelector('.registros').data.file)
        main_data.colecoes[index].addField(obj.name,'object',obj.fields)
        
        about(main_data.colecoes[index])
        saveColecao(index)
    }
    openHTML('add_object',out,[500,0])
})

document.querySelector('#about-fields').addEventListener('click',()=>{
    const index = findColecao(document.querySelector('.registros').data.file)
    const sel = document.querySelector('#about-fields')
    const option = sel.options[sel.selectedIndex]

    const out = new Object
    out.fields = main_data.colecoes[index].fields
    out.index = main_data.colecoes[index].fields.findIndex(p => p.name == option.data.name)
    out.index_col = index
    const old_name = option.data.name
    out.callback = (field)=>{
        const new_name = field.length > out.index ? field[out.index].name : option.data.name

        if(field.hasOwnProperty("delete")){
            main_data.colecoes[index].delField(new_name)
        }else{
            main_data.colecoes[index].editField(old_name,new_name,field[out.index].kind,field[out.index].default,field[out.index].parameters)
        }
        about(main_data.colecoes[index])
        saveColecao(index)
    }

    openHTML('new_field',out,[500,0])

})