// const modalConteudo = document.querySelector('.modal-conteudo')
// const modal = document.querySelector('.modal')
// const cards = document.querySelectorAll('.card')

// for(let card of cards){
//     card.addEventListener('click', function() {
//         const valorID = card.getAttribute('id')
//         window.location.href = `https://rocketseat.com.br/${valorID}`


//         // modalConteudo.classList.add('active')
//         // modalConteudo.querySelector("iframe").src=`https://rocketseat.com.br/${valorID}`
//     })
// }


// document.querySelector('.open-modal').addEventListener('click', function(){
//     if(modalConteudo.classList.contains('active')){
//         modal.classList.add('max')
//     }
// })

// document.querySelector('.close-modal').addEventListener('click', function () {
//     modalConteudo.classList.remove('active')
//     modal.classList.remove('max')
// })

// Implemente uma função que receba como parâmetro um número e, após x milissegundos 
// (dentre um intervalo de 1 a 100 ms. Utilize o setTimeout e as funções floor e random da biblioteca Math), 
// mostre no console o dobro do parâmetro recebido. Em seguida, chame essa função 5 vezes. Ex.:
async function teste(number, val){
    await setTimeout(function(){
       val = val + 1
       return console.log(val)
       //number = number + double
    },Math.floor(Math.random() * 100))

}

teste(1)
