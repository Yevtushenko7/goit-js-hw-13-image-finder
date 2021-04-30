export default {
  
 searchQuery: '',
 page: 1,
   
  fetchImages() {
      const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=21345777-2727fb6864ad43e7f3b061981`
  
      return fetch(url)
      .then(response => response.json())
     .then(({hits}) => {
        this.incrementPage()
        return hits;
     })
    .catch(error => console.log(error))
  },
  get query() {
    return this.searchQuery
  },
  set query(newQuery) {
    this.searchQuery = newQuery
  },
  incrementPage() {
    this.page +=1
  },
  resetPage() {
    this.page = 1
  }
};