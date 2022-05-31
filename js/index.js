
const elCategory = document.querySelector('.js-category')
const elForm = document.querySelector('.js-form')
const elCardTemplate = document.querySelector('.js-template').content;
const elList = document.querySelector('.js-list')
const KINOLAR = movies.slice(0,500)

let getMovies = (kinolar)=>{
    let categories = []
    kinolar.forEach((kino)=>{
    kino.categories.forEach((category)=>{
        if(!categories.includes(category)){
            categories.push(category)
        }
    })
    })
    return categories
}
let renderCategries = ()=>{
    let allCategories = getMovies( KINOLAR)
    allCategories.forEach((category)=>{
    let categoryOption = document.createElement('option')
    categoryOption.textContent = category
    elCategory.appendChild(categoryOption)
    })
}
renderCategries()

let renderMovies = ( KINOLAR)=> {
    elList.innerHTML= null;
    KINOLAR.forEach((movie) =>{
        const elCard = elCardTemplate.cloneNode(true)
        let title = elCard.querySelector('.card-title')
        let img = elCard.querySelector('.card-img-top')
        let text = elCard.querySelector('.card-text')
        let yearsText = elCard.querySelector('.year')
        let rating = elCard.querySelector('.movie__rating ') 
        
        let imgModal = elCard.querySelector('.modal-img')
        let titleModal = elCard.querySelector('.title-modal')
        let filmGanre = elCard.querySelector('.modal-text')
        let filmYear = elCard.querySelector('.modal-year')
        let filmLanguage = elCard.querySelector('.modal-language')
        let filmTime = elCard.querySelector('.modal-time')
        let summryText = elCard.querySelector('.modal-list')

        let idBtn = elCard.querySelectorAll('exampleModalToggle')
        idBtn.href = movie.imdbId

        summryText.textContent = movie.summary
        filmTime.textContent = movie.runtime
        filmLanguage.textContent = movie.language
        filmYear.textContent = movie.year
        filmGanre.textContent = movie.categories
        titleModal.textContent = movie.title
        imgModal.src = movie.bigPoster

        yearsText.textContent = movie.year
        text.textContent = movie.summary.substr(0,45)
        rating.textContent = movie.imdbRating
        img.src = movie.bigPoster
        title.textContent = movie.title.substr(0,30)
        
    
        let elLi= document.createElement('li')
        elLi.className = 'mb-5 list-group-item'
    
        elLi.appendChild(elCard)
        elList.appendChild(elLi)
    
    })

}



let handleFilter = (evt) =>{
    evt.preventDefault();
    let category = elCategory.value
    let filtredMovies = [];
  if (category === 'All') {
      filtredMovies = KINOLAR;
  } else {
      filtredMovies = KINOLAR.filter((movie) => movie.categories.includes(category));
  }
  renderMovies(filtredMovies)
}

elForm.addEventListener('submit', handleFilter);
renderMovies( KINOLAR)
