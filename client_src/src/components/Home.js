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
            moviesPerPage: 20

        }
    }

    componentDidMount(){
        this.getMovies();
    }
    getMovies(){
        axios.get('http://localhost:3000/track?filter={"limit":1000}').then(response => {
            this.setState({movies: response.data}, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    render(){
        const indexOfLastMovie = this.state.currentPage * this.state.moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - this.state.moviesPerPage;
        const currentMovies = this.state.movies.slice(indexOfFirstMovie,indexOfLastMovie);

        const paginate = (pageNumber) => this.setState({currentPage: pageNumber});

        //console.log(currentMovies);
    
        const movieItem = currentMovies.map((movies, i)=> {
            return(
                <MovieItem key={movies.trackid} item = {movies} />
            )
        })
        return (
            <div>
                <h1>Home</h1>
                <div className="collection">
                    {movieItem}
                </div>
                <Pagination moviesPerPage={this.state.moviesPerPage} movies={this.state.movies.length} paginate={paginate} currentPage={this.state.currentPage}/>
            </div>
        )
    }
}

export default Home;