/* GLOBAL VAR */

const main_data = new Object
main_data.colecoes = []
main_data.user_id = 0

/* MODAL */
/*
document.querySelector('.modal-close').addEventListener('click',()=>{
    showModal()
})
    */

class Roseta{
    constructor(name,modal=''){
        this.name = name
        this.modal = modal
        this.fields = []
        this.values = []
    }
}

Roseta.prototype.about = function(){
    const out = new Object
    out.registers = this.values.length
    out.modal = this.modal
    out.name = this.name
    out.fields = this.fields
    return out
}

Roseta.prototype.addField = function(field,kind='text',def=''){
    const fld = new Object
    fld.name = field
    fld.kind = kind
    fld.default = def

    if(!this.fields.some(obj => obj.name === field)){
        this.fields.push(fld)

        for(let i=0; i<this.values.length; i++){
            this.values[i][fld.name] = def
        }
    }
}

Roseta.prototype.newRecord = function(record){
    const reg = new Object
    for(let i=0; i<record.length; i++){
        try{
            reg[record[i].field] = record[i].value
            if(!this.fields.some(obj => obj.name === record[i].field)){
                this.addField(record[i].field)
            }
        }catch{null}
    }
    this.values.push(reg)
}

Roseta.prototype.importCSV = function(csv){

    function splitComa(line){
        line = line.replaceAll(', ', '*|**|*')
        const arr = line.split(',')
        for(let i=0; i<arr.length; i++){
            arr[i] = arr[i].replaceAll('*|**|*', ', ')
        }
        return arr
    }

    const lines = csv.split('\n')

    lines[0] = lines[0].replaceAll('taxonomy|', '')

    const head = lines[0].split('|')

    for(let i=1; i<lines.length; i++){
        const line = splitComa(lines[i])
        const record = []
        for(let j=0; j<Math.max(head.length,line.length); j++){
            const reg = new Object
            reg.field = j<head.length ? head[j] : ''
            reg.value = j<line.length ? line[j] : ''
            record.push(reg)
        }
        this.newRecord(record)
    }
}

Roseta.prototype.fillTable = function(){
    const tbl = document.createElement('table')
    tbl.innerHTML = ''
    const head = document.createElement('tr')
    tbl.appendChild(head)

    for(let i=0; i<this.values.length; i++){
        const line = document.createElement('tr')
        tbl.appendChild(line)
        for (const [key, value] of Object.entries(this.values[i])) {
            if(i==0){
                const th = document.createElement('th')
                th.innerHTML = key
                head.appendChild(th)
        
            }
            const td = document.createElement('td')
            td.innerHTML = value
            line.appendChild(td)    
//            console.log(key,value)
        }

    }

    return tbl

}

main_data.roseta = new Roseta('Obra de Arte')

function addColecao(file){
    main_data.colecoes.push(file)
    const colec =  document.querySelector('#cmb-colecoes')
    const option = document.createElement('option')
    option.value = colec.querySelectorAll('option').length
    option.innerHTML = file.name
    option.data = file
    colec.appendChild(option)
}

function about(collection){
    document.querySelector('.registros').data = collection
//    console.log(collection)
    const fields = document.querySelector('#about-fields')
    document.querySelector('#about-nome').innerHTML = collection.name
    document.querySelector('#about-modal').innerHTML = collection.modal 
    document.querySelector('#about-reg').innerHTML = collection.values.length
    fields.innerHTML = ''
    for(let i=0; i<collection.fields.length; i++){
        const opt = document.createElement('option')
        opt.data = collection.fields[i]
        opt.innerHTML = collection.fields[i].name
        fields.appendChild(opt)
    }

}

function openCSV(file){
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const csv = e.target.result              
            const roseta =  new Roseta(file.name,'Obra de Arte')                        
            roseta.importCSV(csv)
            addColecao(roseta)
        }
        reader.readAsText(file)
    }
}