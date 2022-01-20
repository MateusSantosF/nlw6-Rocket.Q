
export default function Modal(){
    

    const modalWrapper =  document.querySelector('.modal-wrapper');

    const cancelButton = document.querySelector('.button-group .cancel')
    cancelButton.addEventListener('click', close)
 
    function open(){
      modalWrapper.classList.remove('disable')
    }
    function close(){
        modalWrapper.classList.add('disable')
    }
    return{
        open,
        close
    }
}