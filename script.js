const mainBtn = document.querySelector('.main-btn')
const feature = document.querySelector('#feature')
const openAccount = document.querySelector('.header-list-item-btn')
const closeModal = document.querySelector('.btn-close-modal')

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

mainBtn.addEventListener('click',()=>{
    feature.scrollIntoView({behavior:'smooth'})
})

//close modal function
function toCloseModal(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

//open modal
openAccount.addEventListener('click',()=>{
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

//close modal event handler
closeModal.addEventListener('click',()=>{
    toCloseModal()
})

overlay.addEventListener('click', ()=>{
    toCloseModal()
})

document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        toCloseModal()
    }
})