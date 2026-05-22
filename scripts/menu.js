/* MENU */

document.querySelector('#menu-tipo-dados').addEventListener('click',()=>{
    openHTML('data_type')
})

document.querySelector('#menu-import-csv').addEventListener('click',()=>{
    openHTML('load_file',{"accept":".csv","callback": openCSV},[500,300])
})



/* DOM */

document.querySelector('#cmb-colecoes').addEventListener('click',()=>{
    const sel = document.querySelector('#cmb-colecoes')
    const option = sel.options[sel.selectedIndex]
    const data = option.data
    const tbl = document.querySelector('#tbl-registros')

    tbl.innerHTML = data.fillTable().innerHTML

/*
    for(let i=0; i<data.length; i++){
        console.log(data[i])

    }
*/


})