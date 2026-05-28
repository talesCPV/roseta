function openHTML(template,data={},dimension=[0,0]){
    fetch(`templates/${template}.html`)
    .then( stream => stream.text())
    .then( text => {
        const temp = document.createElement('div');
        temp.innerHTML = text;
        const title = temp.getElementsByTagName('title')[0];
        const body = temp.getElementsByTagName('template')[0];
        const script = temp.getElementsByTagName('script')[0] != undefined ? temp.getElementsByTagName('script')[0] : ''
        newModal(template,title,body,script,data,dimension)
    })
}

function closeWindow(id){
    document.querySelector(`#${id}`).remove()
    delete(main_data[id])
}

function newModal(id,ttl,body,script,data={},dimension){

    try{
        const area = document.querySelector('.modal-area')
    
        main_data[id] = data
    
        const modal =  document.createElement('div')
        modal.className = 'modal'
        modal.id = id
    
        const form = document.createElement('div')
        form.className = 'modal-form'
        if(dimension[0] >0 && dimension[1]>0){
            form.style.width = `${dimension[0]}px`
            form.style.height = `${dimension[1]}px`
        }
        modal.appendChild(form)
    
        const head = document.createElement('div')
        head.className = 'modal-head'
        form.appendChild(head)
    
        const title = document.createElement('span')
        title.className = 'modal-title'
        title.innerHTML = ttl.innerText
        head.appendChild(title)
    
        const close = document.createElement('span')
        close.className = 'modal-close'
        close.innerHTML = '&times;'
        close.addEventListener('click',()=>{
            closeWindow(id)
        })
        head.appendChild(close)
    
        const content = document.createElement('div')
        content.className = 'modal-content'
        content.innerHTML = body.innerHTML
        form.appendChild(content)
    
        area.appendChild(modal)
        eval(script.innerHTML)
    }catch{null}

}