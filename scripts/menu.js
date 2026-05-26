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

document.querySelector('#about-save').addEventListener('click',()=>{
    const index = findColecao(document.querySelector('.registros').data)
    console.log(index)
//    saveColecao(index)
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
        main_data.colecoes[index].name = name
        editColecao(index)
    }
})

document.querySelector('#about-edit-modal').addEventListener('click',()=>{
    const modal = prompt('Tipo de Coleção:(ex: Obra de Arte, Revista, etc)',document.querySelector('#about-modal').innerHTML)
    if(modal!=null){
        const index = findColecao(document.querySelector('.registros').data)
        main_data.colecoes[index].modal = modal
        editColecao(index)
    }
})

document.querySelector('#btn-new-colec').addEventListener('click',()=>{
    const nome = prompt('Nome da Coleção')
    if(nome!=null){
        const modal = prompt('Tipo de Coleção:(ex: Obra de Arte, Revista, etc)')
        if(modal!=null){
            addColecao(new Roseta(nome,modal))
        }
    }
})

document.querySelector('#about-novo-campo').addEventListener('click',()=>{
    const roseta = document.querySelector('.registros').data
    if(roseta != undefined){
        openHTML('new_field',roseta,[500,280])
    }
})