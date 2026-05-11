

/* MODAL */

document.querySelector('.modal-close').addEventListener('click',()=>{
    showModal()
})

function showModal(title=''){
    document.querySelector('.modal').style.display = title.length ? 'flex' : 'none'
    document.querySelector('.modal-title').innerHTML = title
}

function openHTML(template,modal='pop-up'){
    const frm = fetch(`templates/${template}.html`)
    .then( stream => stream.text())
    .then( text => {
        console.log(text)
    })

}