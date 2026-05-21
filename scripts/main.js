/* GLOBAL VAR */

const main_data = new Object


/* MODAL */
/*
document.querySelector('.modal-close').addEventListener('click',()=>{
    showModal()
})
    */

class Roseta{
    constructor(modal=undefined){
        this.modal = modal
        this.fields = []
        this.values = []
    }
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
//    console.log(csv)

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

    console.log(lines[0])
    console.log(lines[1])
    console.log(head)
    console.log(splitComa(lines[1]))
/*    
    for(let i=1; i<lines.length; i++){
        console.log(splitComa(lines[i]))
    }
*/


}


main_data.roseta = new Roseta('Obra de Arte')