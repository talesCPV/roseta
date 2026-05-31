function openHTML(template,data={},dimension=[-1,-1]){
    fetch(`templates/${template}.html`)
    .then( stream => stream.text())
    .then( text => {
        const temp = document.createElement('div');
        temp.innerHTML = text;
        const title = temp.getElementsByTagName('title')[0];
        const body = temp.getElementsByTagName('template')[0];
        const script = temp.getElementsByTagName('script')[0] != undefined ? temp.getElementsByTagName('script')[0] : ''
        newWindow(template,title,body,script,data,dimension)
    })
}

function closeWindow(id){
    document.querySelector(`#${id}`).remove()
    delete(main_data[id])
}

function newWindow(id,ttl,body,script,data={},dimension){
    try{
        const area = document.querySelector('.window-area')
    
        main_data[id] = data
    
        const wd =  document.createElement('div')
        wd.className = 'window'
        wd.id = id
    
        const form = document.createElement('div')
        form.className = 'window-form'
        if(dimension[0] >=0 && dimension[1]>=0){
            form.style.width =  dimension[0] ? `${dimension[0]}px` : 'auto'
            form.style.height = dimension[1] ? `${dimension[1]}px` : 'auto'
        }
        wd.appendChild(form)
    
        const head = document.createElement('div')
        head.className = 'window-head'
        form.appendChild(head)
    
        const title = document.createElement('span')
        title.className = 'window-title'
        title.innerHTML = ttl.innerText
        head.appendChild(title)
    
        const close = document.createElement('span')
        close.className = 'window-close'
        close.innerHTML = '&times;'
        close.addEventListener('click',()=>{
            closeWindow(id)
        })
        head.appendChild(close)
    
        const content = document.createElement('div')
        content.className = 'window-content'
        content.innerHTML = body.innerHTML
        form.appendChild(content)
        area.appendChild(wd)
        eval(script.innerHTML)
    }catch{null}

}