

/* MODAL */

document.querySelector('.modal-close').addEventListener('click',()=>{
    showModal()
})

function showModal(title='',body=null, script=null){
    document.querySelector('.modal').style.display = title.length ? 'flex' : 'none'
    try{
        document.querySelector('.modal-title').innerHTML = title
        document.querySelector('.modal-content').innerHTML = body.innerHTML
        eval(script.innerHTML);    
    }catch{null}
}

function openHTML(template){
    fetch(`templates/${template}.html`)
    .then( stream => stream.text())
    .then( text => {
        const temp = document.createElement('div');
        temp.innerHTML = text;
        const title = temp.getElementsByTagName('title')[0];
        const body = temp.getElementsByTagName('template')[0];
        const script = temp.getElementsByTagName('script')[0] != undefined ? temp.getElementsByTagName('script')[0] : ''
        showModal(title.innerText,body,script)
    })

}