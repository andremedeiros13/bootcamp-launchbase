const modalConteudo = document.querySelector('.modal-conteudo')
const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener('click', function() {
        const valorID = card.getAttribute('id')
        modalConteudo.classList.add('active')
        modalConteudo.querySelector("iframe").src=`https://rocketseat.com.br/${valorID}`
    })
}


document.querySelector('.open-modal').addEventListener('click', function(){
    if(modalConteudo.classList.contains('active')){
        modal.classList.add('max')
    }
})

document.querySelector('.close-modal').addEventListener('click', function () {
    modalConteudo.classList.remove('active')
    modal.classList.remove('max')
})