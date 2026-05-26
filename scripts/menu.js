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
    }catch{null}
})

document.querySelector('#about-show').addEventListener('click',()=>{
    const roseta = document.querySelector('.registros').data
    if(roseta != undefined){
        openHTML('show_collection',roseta)
    }
})

document.querySelector('#about-save').addEventListener('click',()=>{
    const roseta = document.querySelector('.registros').data
    if(roseta != undefined){
        saveFile(JSON.stringify(roseta),`/../files/${main_data.user_id}/`)
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

document.querySelector('#btn-new-colec').addEventListener('click',()=>{
    const nome = prompt('Nome da Coleção')
    if(nome!=null){
        const modal = prompt('Tipo de Coleção:(ex: Obra de Arte, Revista, etc)')
        if(modal!=null){
            addColecao(new Roseta(nome,modal))
        }
    }
})
