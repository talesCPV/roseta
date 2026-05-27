/* MENU */

document.querySelector('#menu-tipo-dados').addEventListener('click',()=>{
    openHTML('data_type')
})

document.querySelector('#menu-import-csv').addEventListener('click',()=>{
    openHTML('load_file',{"accept":".csv","callback": openCSV},[500,300])
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
        openHTML('show_collection',roseta)
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

document.querySelector('#about-edit-nome').addEventListener('click',()=>{
    const name = prompt('Digite o nome da coleção:',document.querySelector('#about-nome').innerHTML)
    if(name!=null){
        const index = findColecao(document.querySelector('.registros').data)
        editColecao(index,'name',name)
    }
})

document.querySelector('#about-edit-modal').addEventListener('click',()=>{
    const modal = prompt('Tipo de Coleção:(ex: Obra de Arte, Revista, etc)',document.querySelector('#about-modal').innerHTML)
    if(modal!=null){
        const index = findColecao(document.querySelector('.registros').data)
        editColecao(index,'modal',modal)
    }
})

document.querySelector('#btn-new-colec').addEventListener('click',()=>{
    const nome = prompt('Nome da Coleção')
    if(nome!=null){
        const modal = prompt('Tipo de Coleção:(ex: Obra de Arte, Revista, etc)')
        if(modal!=null){
            const roseta = new Roseta(nome,modal)
            addColecao(roseta)
            saveColecao(findColecao(roseta))
        }
    }
})

document.querySelector('#about-novo-campo').addEventListener('click',()=>{
    const obj = new Object
    obj.register = document.querySelector('.registros').data
    obj.data = null
    if(obj.register != undefined){
        openHTML('new_field',obj,[500,280])
    }
})

document.querySelector('#about-fields').addEventListener('click',()=>{
    const sel = document.querySelector('#about-fields')
    const option = sel.options[sel.selectedIndex]        
    console.log(option.data)
    const obj = new Object
    obj.register = document.querySelector('.registros').data
    obj.data = option.data
    if(obj.register != undefined){
        openHTML('new_field',obj,[500,280])
    }
})