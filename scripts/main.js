/* GLOBAL VAR */

const main_data = new Object
main_data.colecoes = []
main_data.user_id = 0

/* CATEGORIA */
/*
document.querySelector('.categoria-close').addEventListener('click',()=>{
    showcategoria()
})
    */

class Roseta{
    constructor(name,categoria=''){
        this.name = name
        this.file = name+'.rst'
        this.categoria = categoria
        this.fields = []
        this.registers = []
    }
}

Roseta.prototype.about = function(){
    const out = new Object
    out.registers = this.registers.length
    out.categoria = this.categoria
    out.name = this.name
    out.file = this.file    
    out.fields = this.fields
    return out
}

Roseta.prototype.delField = function(field){
    const index = this.fields.findIndex(p => p.name == field)
    if(index>=0){
        this.fields.splice(index,1)
        for(let i=0; i<this.registers.length; i++){
            delete(this.registers[i][field])
        }
    }
}

Roseta.prototype.addField = function(field,kind='text',def='',parameters={}){
    const fld = new Object
    fld.name = field
    fld.kind = kind
    fld.default = def
    fld.parameters = parameters

    if(!this.fields.some(obj => obj.name === fld.name)){
        this.fields.push(fld)
        for(let i=0; i<this.registers.length; i++){
            this.registers[i][fld.name] = fld.default
        }
    }
}

Roseta.prototype.addObject = function(obj){
    const fld = new Object
    fld.name = obj.name
    fld.kind = 'object'
    fld.default = new Object
    fld.default.name = obj.name
    fld.default.file = this.file
    fld.default.categoria = obj.name
    fld.default.fields = obj.fields
    fld.default.registers = []

    if(!this.fields.some(reg => reg.name === fld.name)){
        this.fields.push(fld)
        for(let i=0; i<this.registers.length; i++){
            this.registers[i][fld.name] = fld.default
        }
    }
}

Roseta.prototype.editField = function(response){
    if(response.up){
        this.fields = bubble_obj(this.fields,response.callname)
    }else if(response.del){
        delete(this.fields[response.callname])
        for(let i=0; i<this.registers.length; i++){
            delete(this.registers[i][response.callname])
        }    
    }else{
        this.fields[response.name] = new Object
        this.fields[response.name].default = response.default
        this.fields[response.name].kind = response.kind
        this.fields[response.name].parameters = response.parameters
        this.fields[response.name].type = response.hasOwnProperty('type') ? response.type : response.kind
        if(response.name != response.callname){
            this.fields = position_obj(this.fields,response.name,response.callname)
            delete(this.fields[response.callname])
        }
        for(let i=0; i<this.registers.length; i++){
            if(response.name != response.callname){
                this.registers[i][response.name] = this.registers[i][response.callname]                
                delete(this.registers[i][response.callname])
            }else{
                this.registers[i][response.name] = this.fields[response.name].default
            }
        }
    }
}

Roseta.prototype.newRecord = function(record){
    const reg = new Object
    for(let i=0; i<record.length; i++){
        try{
            const fullfield = record[i].field.split(',')
            record[i].field = fullfield[fullfield.length==1 ? 0 : 1]
            reg[record[i].field] = record[i].value
            if(!this.fields.some(obj => obj.name === record[i].field)){
                this.addField(record[i].field,fullfield.length==1 ? 'text' : fullfield[0])
            }
        }catch{null}
    }
    this.registers.push(reg)
}

Roseta.prototype.editCollection = function(field,value){    
    this[field] = value
}

Roseta.prototype.cloneCollection = function(){
    const out = new Roseta(this.name,this.categoria)
    out.fields = this.fields
    out.registers = this.registers
    return out
}

Roseta.prototype.editRegister = function(index,field,value){
    this.registers[index][field] = value
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
//    lines[0] = lines[0].replaceAll('taxonomy|', '')
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


Roseta.prototype.importJSON = function(json){
    this.name = json.name
    this.categoria = json.categoria
    this.fields = json.fields
    this.registers = json.registers
}

function findColecao(file){
    try{
        return main_data.colecoes.findIndex(p => p.file == file);
    }catch{
        return -1
    }
}

function editColecao(index,field,value){

    return  new Promise((resolve,reject) =>{

        if(main_data.colecoes[index] != undefined){
            main_data.colecoes[index].editCollection(field,value)
            saveColecao(index)
            resolve('ok')
        }else{
            reject(new Error("Registro não encontrado!"))
        }
    })
}

function saveColecao(index,filename=''){
    const roseta = main_data.colecoes[index]
    if(roseta != undefined){
        filename =  filename.length ? filename : roseta.file
        saveFile(roseta,`/../files/${main_data.user_id}/`,filename)
    }
}

function addColecao(file){
    if(findColecao(file.file)<0){
        main_data.colecoes.push(file)
        const colec =  document.querySelector('#cmb-colecoes')
        const option = document.createElement('option')
        option.value = colec.querySelectorAll('option').length
        option.innerHTML = file.file
        option.data = file
        colec.appendChild(option)
    }else{
        alert('Já existe uma coleção com este nome')
    }
}

function delColecao(file){
    return new Promise((resolve,reject) =>{
        const index = findColecao(file.file)
        const colec =  document.querySelector('#cmb-colecoes')
        if(colec.options[index].data.name == main_data.colecoes[index].name){
            colec.options[index].remove()
            const filename =  main_data.colecoes[index].file
            delFile(`/../files/${main_data.user_id}/${filename}`)
            .then((response)=>{
                resolve('ok')
                main_data.colecoes.splice(index,1)
                clearFields()
            })
        }else{
            reject(new Error("Registro não encontrado!"))
        }
    })

}

function about(file){
    document.querySelector('.registros').data = file
    const fields = document.querySelector('#about-fields')
    document.querySelector('#about-file').innerHTML = file.file
    document.querySelector('#about-nome').innerHTML = file.name
    document.querySelector('#about-categoria').innerHTML = file.categoria 
    document.querySelector('#about-reg').innerHTML = file.registers.length
    fields.innerHTML = ''
    for (const [key, value] of Object.entries(file.fields)) {
        const opt = document.createElement('option')
        opt.data = value
        opt.name = key
        opt.value = value
        opt.innerHTML =  key
        fields.appendChild(opt)
    }
}

function openCSV(file){
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const csv = e.target.result              
            const roseta =  new Roseta(file.name,'DEFAULT')                        
            roseta.importCSV(csv)
            addColecao(roseta)
            saveColecao(findColecao(file.name+'.rst'))
        }
        reader.readAsText(file)
    }
}

function clearFields(){
        const el = document.querySelectorAll('.about-field')
        for(let i=0; i<el.length; i++){
            el[i].innerHTML = ''
        }
        enableFields(0)
}

function enableFields(enable=1){
    const el = document.querySelectorAll('.only-register')
    for(let i=0; i<el.length; i++){
        el[i].disabled = !enable ? 1 : 0         
    }
}

function bubble_obj(obj,key){
    const before = new Object
    const after = JSON.parse(JSON.stringify(obj))
    let last = new Object
    for (const [look, value] of Object.entries(after)) {
        if(key===look && last){
            const here = new Object
            here[look] = value
            delete(after[look])
            Object.assign(before,here,last,after)
            return before
        }else{
            Object.assign(before,last)
            last = new Object
            last[look] = value
            delete(after[look])
        }
    }
    return Object.assign(before,last)
}

function position_obj(obj,key,key_ref,next=1){
    if(obj.hasOwnProperty(key)){
        const before = new Object
        const after = JSON.parse(JSON.stringify(obj))
        const org = new Object
        org[key] = after[key]
        delete(after[key])
        for (const [look, value] of Object.entries(after)) {
            const last = new Object
            last[look] = value
            if(key_ref===look){
                if(next){
                    return Object.assign(before,last,org,after)
                }else{
                    return Object.assign(before,org,last,after)
                }
            }
            Object.assign(before,last)
            delete(after[look])
        }
        return Object.assign(before,org)
    }else{
        return obj
    }
}

function bubble_arr(arr,i){
    const out = JSON.parse(JSON.stringify(arr))
    if(i && i<out.length){
        const mem = out[i-1]
        out[i-1] = out[i]
        out[i] = mem    
    }
    return out
}