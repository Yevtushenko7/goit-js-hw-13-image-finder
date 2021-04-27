import './styles.css';
import apiService from './js/apiService';
import phtTpl from './templates/photo-template.hbs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    clearBtn: document.querySelector('.clear-btn'),
    loadMoreBtn:document.querySelector('.more-btn'),
}

refs.loadMoreBtn.style.display = "none";

const appendCardsMarkup = imgs => {
  refs.gallery.insertAdjacentHTML('beforeend', phtTpl(imgs))
}
const clearCardsMarkup = () => {
  refs.gallery.innerHTML = '';
}

const onLoadMoreBtnClick = () => {
  apiService.fetchImages().then(hits => {
    appendCardsMarkup(hits)
  })
}

const onSearch = e => {
  e.preventDefault()
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query.trim() === '') {
    return alert('Please Enter Search Query')
  }
  apiService.resetPage()
  apiService.fetchImages().then(hits => {
    clearCardsMarkup()
    appendCardsMarkup(hits)
    refs.loadMoreBtn.style.display = "block";
  })
}
const onClearBtnClick = () => {
  refs.gallery.innerHTML = '';
  refs.searchForm.elements[0].value = '';
  refs.loadMoreBtn.style.display = 'none';
}

refs.searchForm.addEventListener('submit', onSearch)
refs.clearBtn.addEventListener('click', onClearBtnClick)
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
