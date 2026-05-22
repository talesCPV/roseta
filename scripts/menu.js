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
        const data = option.data
        const tbl = document.querySelector('#tbl-registros')    
        tbl.innerHTML = data.fillTable().innerHTML
        console.log(data)
        document.querySelector('#btn-fields').disabled = 0
    }catch{null}
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

document.querySelector('#btn-new-reg').addEventListener('click',()=>{
    
})

document.querySelector('#btn-fields').addEventListener('click',()=>{
  console.log(document.querySelector('#cmb-colecoes').value)  
})
