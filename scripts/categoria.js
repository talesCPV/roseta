function openHTML(template,data={},dimension=[0,0]){
    fetch(`templates/${template}.html`)
    .then( stream => stream.text())
    .then( text => {
        const temp = document.createElement('div');
        temp.innerHTML = text;
        const title = temp.getElementsByTagName('title')[0];
        const body = temp.getElementsByTagName('template')[0];
        const script = temp.getElementsByTagName('script')[0] != undefined ? temp.getElementsByTagName('script')[0] : ''
        newCategoria(template,title,body,script,data,dimension)
    })
}

function closeWindow(id){
    document.querySelector(`#${id}`).remove()
    delete(main_data[id])
}

function newCategoria(id,ttl,body,script,data={},dimension){

    try{
        const area = document.querySelector('.categoria-area')
    
        main_data[id] = data
    
        const categoria =  document.createElement('div')
        categoria.className = 'categoria'
        categoria.id = id
    
        const form = document.createElement('div')
        form.className = 'categoria-form'
        if(dimension[0] >0 && dimension[1]>0){
            form.style.width = `${dimension[0]}px`
            form.style.height = `${dimension[1]}px`
        }
        categoria.appendChild(form)
    
        const head = document.createElement('div')
        head.className = 'categoria-head'
        form.appendChild(head)
    
        const title = document.createElement('span')
        title.className = 'categoria-title'
        title.innerHTML = ttl.innerText
        head.appendChild(title)
    
        const close = document.createElement('span')
        close.className = 'categoria-close'
        close.innerHTML = '&times;'
        close.addEventListener('click',()=>{
            closeWindow(id)
        })
        head.appendChild(close)
    
        const content = document.createElement('div')
        content.className = 'categoria-content'
        content.innerHTML = body.innerHTML
        form.appendChild(content)
    
        area.appendChild(categoria)
        eval(script.innerHTML)
    }catch{null}

}