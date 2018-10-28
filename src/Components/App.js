import React, { Component } from 'react';
import SearchBox from './search_box';
import Bulletpoints from './bulletpoints';
import Details from './details';
import Recommendations from './recommendations';
import Footer from './footer';
import { Api } from '../restApi';
import ReallySmoothScroll from 'really-smooth-scroll';
import '../App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMovie : null,
      recommendations : [],
      input : '',
      dropdown : [],
      hover : null,
      wishlist : []
    }
    this.loadRecMovie = this.loadRecMovie.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
    this.smoothScroll = this.smoothScroll.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.addWishlist = this.addWishlist.bind(this);
    this.removeWishlist = this.removeWishlist.bind(this);
  }

  componentWillMount(){
    this.loadRecommendations(`The-Nun`,`Blade-Runner`,`Doctor.Strange`);

    const LocalStorageRef = localStorage.getItem('my_movies');
    if (LocalStorageRef){
      this.setState({wishlist : JSON.parse(LocalStorageRef)})
    }
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('my_movies',JSON.stringify(nextState.wishlist))
  }

  async fetchMovie(e){
    if (e.keyCode === 13){
      let movie = e.target.value.match(/.*(?=\s-)/gi);
      let year = (e.target.value).match(/\d+$/g);
      let url = `${Api.url}?apikey=${Api.key}&plot=full&t=${movie}&y=${year}`;
      const res = await fetch(url);
      const _movie = await res.json();
      this.setState({
        currentMovie : _movie
      })
    }
  }

  async fetchRecommendations(movieId,movieTitle) {
      let movie_Title = movieTitle === undefined ? '' : movieTitle;
      let url = `${Api.url}?apikey=${Api.key}&plot=full&i=${movieId}&t=${movie_Title}`;
      const res = await fetch(url);
      const recommended_movie = await res.json();
      let currRecc = [...this.state.recommendations];
      currRecc.push(recommended_movie);
      let slicedArr = (currRecc) ? currRecc.slice(-4) : null;
      let dropdownArr = slicedArr.map((movie)=>{return `${movie.Title} - ${movie.Year}`})
      this.setState({
        recommendations : slicedArr,
        dropdown : dropdownArr
      })

  }

  async searchMovies(search_Item) {
    if (search_Item.length > 0){
      let url = `${Api.url}?&apikey=${Api.key}&type=movie&s=${search_Item}`;
      const res = await fetch(url);
      const recc_movies = await res.json();
      if (recc_movies.Response === 'True') {
          let fourMovies = recc_movies.Search.slice(0,4);
            fourMovies.map((x)=>{
             if (x.Poster !== 'N/A') {
               let fetchIds = this.state.recommendations.map((movie)=>{
                return movie.imdbID;
               });
               if (Object.values(fetchIds).indexOf(x.imdbID) === -1){
                this.fetchRecommendations(x.imdbID)
               }
              }
             return null;
          });
        }
       }
     }

  addWishlist(){
    let currentMovie = this.state.currentMovie;
    let addMovie = {
      imdbID : currentMovie.imdbID,
      title : currentMovie.Title,
      poster : currentMovie.Poster, 
      year : currentMovie.Year
   }
    let wishlist = [...this.state.wishlist];
      wishlist.push(addMovie)
      this.setState({ wishlist : wishlist });   
   
  }

  removeWishlist(i,id){
    let arr1 = [...this.state.wishlist].splice(id+1);
    let arr2 = [...this.state.wishlist].splice(0,id).concat(arr1);
    this.setState({wishlist : arr2});
  }

  loadRecMovie(i,id){
    this.smoothScroll(1);
    let copyRecommendation = {...this.state.recommendations[id]}
    this.setState({
      currentMovie : copyRecommendation
    })
  }

  loadRecommendations(){
      Object.values(arguments).map((rec_movie)=>{ 
        this.fetchRecommendations('',rec_movie);
        return null;
      });
  }

  handleChange(event){
    let word = event.target.value;
    this.setState({
      input : word
    })
    this.searchMovies(word);
  }
  
  smoothScroll(num){
    ReallySmoothScroll.shim();
    num === 1 ? window.scrollTo(0,0) : window.scrollTo(0,700);
  }

  onMouseEnter(i,id){
    this.setState({
      hover:id
    })
  }

  onMouseLeave(){
    this.setState({
      hover : null
    })
  }
  render() {
    return (
      <main className='container'>
        <SearchBox movieState={this.state.currentMovie} 
                   dropdownState={this.state.dropdown}
                   wishlistState={this.state.wishlist}
                   dropdownSelect={this.fetchMovie}
                   input={this.state.input} 
                   handleChange={this.handleChange} 
                   removeWishlist={this.removeWishlist}/>
        <Bulletpoints state={this.state.currentMovie} 
                      SmoothScroll={this.smoothScroll} 
                      addWishlist={this.addWishlist} />
        <Details state={this.state.currentMovie} />
        <Recommendations handleClick={this.loadRecMovie} 
                         reccState={this.state.recommendations}
                         hover={this.state.hover}
                         onMouseEnter={this.onMouseEnter}
                         onMouseLeave={this.onMouseLeave}/>
        <Footer scroll={this.smoothScroll} /> 
      </main>
    );
  }
}

export default App;
