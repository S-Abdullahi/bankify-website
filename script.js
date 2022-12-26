const navCon = document.querySelector('.header')
const mainBtn = document.querySelector('.main-btn')
const feature = document.querySelector('#feature')
const openAccount = document.querySelector('.header-list-item-btn')
const closeModal = document.querySelector('.btn-close-modal')
const operationTabsCon = document.querySelector('.operations-btn-con')
const operationsTabs = document.querySelectorAll('.operations-btn')
const operationContent = document.querySelectorAll('.operations-detail-con')
const header = document.querySelector('.header')

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

//event delegation
document.querySelector('.header-list').addEventListener('click', (e)=>{
    if(e.target.classList.contains('nav-link')){
        e.preventDefault()
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

//operations functinalities
operationTabsCon.addEventListener('click', (e)=>{
    const clicked = e.target.closest('.operations-btn')
    if(!clicked) return
    //deactivating button
    operationsTabs.forEach((tab)=>{
        tab.classList.remove('operation-btn-active')
    })
    operationContent.forEach((content)=>{
        content.classList.remove('operations-detail-active')
    })

    
    //activating button
    clicked.classList.add('operation-btn-active')
    document.querySelector(`.operation-content-${clicked.dataset.tab}`).classList.add('operations-detail-active')
})

//hover effect on navigation
function handleHoverEffect(e, opacity){
    if(e.target.classList.contains('nav-link')){
        const link = e.target
        const siblings = link.closest('.header').querySelectorAll('.nav-link')
        const logo = link.closest('.header').querySelector('img')

        siblings.forEach((item)=>{
            if(item !== link) item.style.opacity = opacity
        })
        logo.style.opacity = opacity
    }
}

navCon.addEventListener('mouseover',function(e){
    handleHoverEffect(e,0.5)
})

navCon.addEventListener('mouseout', function(e){
    handleHoverEffect(e,1)
})

//sticky header
// const stickyStart = feature.getBoundingClientRect()
// window.addEventListener('scroll',()=>{
//     if(scrollY > stickyStart.top){header.classList.add('sticky')} 
//     else{
//         header.classList.remove('sticky')
//     }
// })
const main = document.querySelector('.main')
const headerHeight = header.getBoundingClientRect().height
const stickyNav = function(entries){
    const [entry] = entries
    if(!entry.isIntersecting){
        header.classList.add('sticky')
    } else{
        header.classList.remove('sticky')
    }
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`
})
headerObserver.observe(main)


//reveal sections
function revealSection(entries, observer){
    const [entry] = entries

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden')
    observer.unobserve(entry.target)
}

const sectionAll = document.querySelectorAll('section')
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})

sectionAll.forEach((section)=>{
    sectionObserver.observe(section)
    section.classList.add('section-hidden')
})

