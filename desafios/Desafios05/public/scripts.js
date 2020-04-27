// const modalConteudo = document.querySelector('.modal-conteudo')
// const modal = document.querySelector('.modal')
// const cards = document.querySelectorAll('.card')

// for(let card of cards){
//     card.addEventListener('click', function() {
//         const valorID = card.getAttribute('id')
//         window.location.href = `https://rocketseat.com.br/${valorID}`


//         modalConteudo.classList.add('active')
//         modalConteudo.querySelector("iframe").src=`https://rocketseat.com.br/${valorID}`
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
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


function paginate(selectedPage, totalPages){
        
    let pages = [],
    oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){

        const fistAndLasPage = currentPage == 1 || currentPage == totalPages
        const pagesAfeterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(fistAndLasPage || pagesBeforeSelectedPage && pagesAfeterSelectedPage){
            
            if(oldPage && currentPage - oldPage > 2){
                pages.push("...")            
            }
            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }
            
        pages.push(currentPage)
            
        oldPage = currentPage
        }
    }

return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for(let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        }else{
            if(filter) {
                elements += `<a href="?page=${page}&filter=${filter}" >${page}</a>`
            }else{
                elements += `<a href="?page=${page}" >${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")


if(pagination){
}
createPagination(pagination)