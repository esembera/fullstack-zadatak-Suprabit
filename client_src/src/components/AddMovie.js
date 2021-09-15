import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class AddMovie extends Component{
    addMovie(newTrack, newMovie, newTrackGenre){
        console.log(newMovie);
        axios.request({
            method: 'post',
            url: 'http://localhost:3000/track',
            data: newTrack
        })
        axios.request({
            method: 'post',
            url: 'http://localhost:3000/movie',
            data: newMovie
        })
        axios.request({
            method: 'post',
            url: 'http://localhost:3000/trackgenre',
            data: newTrackGenre
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }
      
    onSubmit(a){
        const newTrack = {
            tracktitle: this.refs.title.value,
            releasedate: this.refs.releasedate.value + "T00:00:00.000Z",
            duration: this.refs.hours.value*360 + this.refs.minutes.value * 6 + '0',
            tagrestriction: parseInt(this.refs.rating.value),
            trackrating: 0
        }
        const newMovie = {
            boxincome: parseInt(this.refs.income.value)
        }
        const newTrackGenre={
            genreid: parseInt(this.refs.genre.value)
        }
        //console.log(newMovie, newTrackGenre, newTrack)
        this.addMovie(newTrack, newMovie, newTrackGenre);
        a.preventDefault();
    }

    render(){
        
        return (
            <div>
                <h1>Add new movie</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input id="name" type="text" ref="title"/>
                        <label htmlFor="name">Title</label>
                    </div>
                    <div className="input-field">
                        <input name="ReleaseDate" type="text" className="datepicker" ref="releasedate"/>
                        <label htmlFor="ReleaseDate">Release Date</label>
                    </div>
                    Runtime:
                    <div className="input-field inline">
                        <input name="Hours" type="text" ref="hours"/>
                        <label htmlFor="Hours">Hours</label>
                    </div>
                    <div className="input-field inline">
                        <input name="Minutes" type="text" ref="minutes"/>
                        <label htmlFor="Minutes">Minutes</label>
                    </div>
                    <br />
                    Age Rating:
                    <div className="input-field inline">
                        <input name="rating" type="number" ref="rating"/>
                        <label htmlFor="rating"></label>
                    </div>

                    <div className="input-field">
                        <select ref="genre">
                        <option value="" disabled selected hidden>Choose movie genre</option>
                        <option value="3">Anime Features</option>
                        <option value="4">Thrillers</option>
                        <option value="5">Comedies</option>
                        <option value="6">Music & Musicals</option>
                        <option value="7">Dramas</option>
                        <option value="13">Romantic Movies</option>
                        <option value="15">Family Movies</option>
                        <option value="17">Sci-Fi & Fantasy</option>
                        <option value="18">Action & Adventure</option>
                        <option value="19">Documentaries</option>
                        <option value="26">Horror</option>
                        <option value="32">Shows</option>                       
                        </select>
                        <label>Genre</label>
                    </div> 

                    <div className="input-field">
                        <input name="income" type="number" ref="income"/>
                        <label htmlFor="income">Income (USD)</label>
                    </div>
                    <input type="submit" value="ADD" className="btn right" />
                </form>
                <Link className="btn yellow darken-3" to="/">Back</Link>
            </div>
            
        )
    }
}

export default AddMovie;