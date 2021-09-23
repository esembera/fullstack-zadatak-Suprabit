import React, {Component} from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import Pagination from './Pagination';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            movies: [],
            currentPage: 1,
            moviesPerPage: 15,
            filterValue: '',
            moviesCount: 0
        }
    }

    componentDidMount(){
        this.getMovies();
    }

    getMovies(currentPage = 1){
        const filter1 = {where: {tracktitle: {ilike: "%" + this.state.filterValue + "%"}}}
        axios.get('http://localhost:3000/track/count', {params: filter1}).then(response => {
            this.setState({moviesCount: response.data.count}, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
        const filter2 = {filter: {offset: (currentPage-1)*this.state.moviesPerPage ,limit:this.state.moviesPerPage ,where: {tracktitle: {ilike: "%" + this.state.filterValue + "%"}}}}
        axios.get('http://localhost:3000/track', {params: filter2}).then(response => {
            this.setState({movies: response.data}, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    onSubmit(a){
        this.state.filterValue=this.refs.search.value;
        this.getMovies();
        a.preventDefault();
    }

    render(){
        const indexOfLastMovie = this.state.currentPage * this.state.moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - this.state.moviesPerPage;

        const paginate = (pageNumber) => {
            //console.log(this.state.currentPage);    
            this.setState({currentPage: pageNumber})
            this.getMovies(pageNumber)
            //console.log(this.state.currentPage);
        }; 

        //console.log(currentMovies);
    
        const movieItem = this.state.movies.map((movies, i)=> {
            return(
                <MovieItem key={movies.trackid} item = {movies} />
            )
        })
        return (
            
            <div>
                <h1>Home</h1>
                <nav>
                    <div className="yellow darken-3 nav-wrapper">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="input-field">
                            <input id="search" type="search" ref="search"/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons left">search</i></label>
                            <i className="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                
                <div className="collection">
                    {movieItem}
                </div>
                <Pagination moviesPerPage={this.state.moviesPerPage} movies={this.state.moviesCount} paginate={paginate} currentPage={this.state.currentPage}/>
            </div>
        )
    }
}

export default Home;