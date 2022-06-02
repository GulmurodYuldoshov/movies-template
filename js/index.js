
const elCategory = document.querySelector('.js-category')
const elForm = document.querySelector('.js-form')
const elCardTemplate = document.querySelector('.js-template').content;
const elList = document.querySelector('.js-list')
const elSearchInput = document.querySelector('.js-search')
const elSort = document.querySelector('.sort-selct')
const KINOLAR = movies.slice(0,200)
const elPrevBtn = document.querySelector('.prev-btn')
const elNextBtn = document.querySelector('.next-btn')
const elPageCount = document.querySelector('.page-count')

let limt = 8
let page = 1
let maxPage = Math.ceil(KINOLAR.length / limt)
console.log(maxPage)


const sortFounction = {
    az: (a,b)=>{
        if(a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()){
        return -1
        }else{
        return 1
        }
      },
    za:(a,b)=>{
        if(a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()){
        return 1
        }else{
        return -1
        }
      },
    hl: (a,b)=>{
        if(a.imdbRating < b.imdbRating){
            return 1
        }else{
            return -1
        }
    },
    lh: (a,b)=>{
        if(a.imdbRating < b.imdbRating){
            return -1
        }else{
            return 1
        }
    } ,
    on: (a,b)=>{
        if(a.year < b.year){
            return -1
        }else{
            return 1
        }
    }  ,
    no: (a,b)=>{
        if(a.year < b.year){
            return 1
        }else{
            return -1
        }
    }  

}


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
let modalName="#exampleModalToggle";
let renderMovies = ( KINOLAR)=> {
    elList.innerHTML= null;
    let i=0;
    KINOLAR.forEach((movie) =>{
        const elCard = elCardTemplate.cloneNode(true);
        elCard.querySelector(modalName).id+=i;
        let title = elCard.querySelector('.card-title')
        let img = elCard.querySelector('.card-img-top')
        let text = elCard.querySelector('.card-text')
        let yearsText = elCard.querySelector('.year')
        let rating = elCard.querySelector('.movie__rating ') 
        let filmLink = elCard.querySelector('.link')
        
        let imgModal = elCard.querySelector('.modal-img')
        let titleModal = elCard.querySelector('.title-modal')
        let filmGanre = elCard.querySelector('.modal-text')
        let filmYear = elCard.querySelector('.modal-year')
        let filmLanguage = elCard.querySelector('.modal-language')
        let filmTime = elCard.querySelector('.modal-time')
        let summryText = elCard.querySelector('.modal-list')
        let idBtn = elCard.querySelectorAll(modalName+i);
        idBtn.href = movie.imdbId
        idBtn[0].nextElementSibling.nextElementSibling.href=modalName+i;
     i+=10;
        filmLink.href = movie.trailer
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
        elLi.className = 'mb-5 list-group-item  '    
        elLi.appendChild(elCard)
        elList.appendChild(elLi)
    
    })
}

let handleFilter = (evt) =>{
    evt.preventDefault();

    let category = elCategory.value
    let searchValue =  elSearchInput.value.trim()
    let sort = elSort .value

    let regex = new RegExp(searchValue, 'gi')

    let filtredMovies = [];
  if (category === 'All') {
      filtredMovies = KINOLAR;
  } else {
      filtredMovies = KINOLAR.filter((movie) => movie.categories.includes(category));
  }

  filtredMovies = filtredMovies.filter((movie) =>movie.title.match(regex));

  filtredMovies.sort(sortFounction[sort]);
  renderMovies(filtredMovies)
}
elPageCount.textContent = page;
let handleNextPage =()=>{
    page +=1;

    if(page <= maxPage){
        elPageCount.textContent = page;
        renderMovies(KINOLAR.slice(limt*(page-1),limt*page))
    }
    if(page===maxPage){
        elNextBtn.disabled = true
    }else{
        elPrevBtn.disabled  = false
        elNextBtn.disabled = false
    }
}

elPrevBtn.disabled  = true
let  handlePrevPage=()=>{
    page -=1;

    if(page > 0){
        elPageCount.textContent = page;
        renderMovies(KINOLAR.slice(limt*(page-1),limt*page))
    }
    if(page===1){
        elPrevBtn.disabled = true
    }
}


elPrevBtn.addEventListener('click', handlePrevPage)
elNextBtn.addEventListener('click', handleNextPage)
elForm.addEventListener('submit', handleFilter);
renderMovies( KINOLAR.slice(0,8))
