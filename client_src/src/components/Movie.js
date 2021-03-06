import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Movie extends Component{

    constructor(props){
        super(props);
        this.state = {
            details: '',
            genreName: '',
            movieDet: ''
        }
    }

    componentDidMount(){
        this.getMovies();
        this.getGenre();
        this.getMovieDet();
    }

    getMovies(){
        let movieID = this.props.match.params.id;
        axios.get(`http://localhost:3000/track/${movieID}`).then(response => {
            this.setState({details: response.data}, () => {
                //console.log(this.state);
                if (response.data.tagrestriction == null){
                    response.data.tagrestriction = "Unknown"
                }
                response.data.releasedate=response.data.releasedate.substring(0,10);
                response.data.hours = response.data.duration.hours;
                response.data.minutes = response.data.duration.minutes;
                //console.log(response.data.hours, response.data.minutes)
            })
        })
        .catch(err => console.log(err));
    }

    getGenre(){
        let movieID = this.props.match.params.id;
        axios.get(`http://localhost:3000/tracks/${movieID}/genres`).then(response => {
            this.setState({genreName: response.data[0].genrename}, () => {
                //console.log(response.data);
            })
        }).catch(err => console.log(err));
    }

    getMovieDet(){
        let movieID = this.props.match.params.id;
        axios.get(`http://localhost:3000/tracks/${movieID}/movie`).then(response => {
            this.setState({movieDet: response.data}, () => {
                //console.log(this.state.genre[0].genrename);
                if(response.data.boxincome == null){
                    response.data.boxincome = "Unknown"
                }                
            })
        })
        .catch(err => console.log(err));
    }

    onDelete(){
        let movieID = this.state.details.trackid;
        axios.delete(`http://localhost:3000/track/${movieID}`);
        axios.delete(`http://localhost:3000/tracks/${movieID}/genres`);
        axios.delete(`http://localhost:3000/tracks/${movieID}/movie`).then(response => {
           this.props.history.push('/home');
        }).catch(err => console.log(err));
    }

    render(){
        var formatter = new Intl.NumberFormat('en-US',{
            style: 'currency',
            currency: 'USD',
        });
        
        return (
            <div>
                <button className="right btn red darken-2" onClick={this.onDelete.bind(this)} >Delete</button>
                <h1>{this.state.details.tracktitle}</h1>
                <ul className="collection" >
                    <li className="collection-item">Release date: {this.state.details.releasedate}</li>
                    <li className="collection-item">Runtime: {this.state.details.hours}h {this.state.details.minutes}min</li>
                    <li className="collection-item">Age Rating: {this.state.details.tagrestriction}</li>
                    <li className="collection-item">Genre: {this.state.genreName}</li>
                    <li className="collection-item">Income: {formatter.format(this.state.movieDet.boxincome)}</li>                    
                </ul>
                <Link className="btn yellow darken-3" to="/home">Back</Link> 
                <Link className ="right btn blue darken-2"to={`/movie/edit/${this.state.details.trackid}`}> Edit </Link>
            </div>
        )
    }
}

export default Movie;