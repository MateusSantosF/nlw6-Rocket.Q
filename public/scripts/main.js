

import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal-wrapper .modal .title')
const modalSubtitle = document.querySelector('.modal-wrapper .modal .subtitle')
const cancelButtonModal = document.querySelector('.button-group button.red')


/* BOTOES  CHECK*/

const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach( b =>{
    b.addEventListener('click', event=>{
        validateTypeButton(event)
    })
})

/* BOTOES  DELETE*/
const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach( b =>{
    b.addEventListener('click', event=>{
        validateTypeButton(event, false)
    })
})

function validateTypeButton(event, typeCheck = true){

    event.preventDefault()


    const roomId = document.querySelector('#room-id').dataset.id
    console.log(`AQUI PORRA ${roomId}`)
    const slug = typeCheck ? "check" : "delete"
    const questionId = event.target.dataset.id;

    modalTitle.innerHTML = typeCheck ? 'Marcar pergunta como lida' : 'Excluir Pergunta'
    modalSubtitle.innerHTML = typeCheck ? 'Tem certeza que você deseja marcar como lida está pergunta?' : 'Tem certeza que você deseja excluir esta pergunta?'
    typeCheck ? cancelButtonModal.classList.remove('red') : cancelButtonModal.classList.add('red')
    cancelButtonModal.innerHTML = typeCheck ? 'Sim, marcar' : 'Sim Excluir'


    const form = document.querySelector('.modal-wrapper .modal form')
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)
    modal.open()
}


function copyClipboard(){
    var text =  document.querySelector('#room-id').dataset.id
    navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
     console.error('Async: Could not copy text: ', err);
    });
}
