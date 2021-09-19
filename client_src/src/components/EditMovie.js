import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditMovie extends Component{

    constructor (props){
        super(props);
        this.state = {
            trackid: '',
            tracktitle: '',
            releasedate: '',
            ageRating: '',
            income: '',
            hours: '',
            minutes: '',
            genreID: ''
        }
    }

    componentDidMount(){
        this.getMovieDet();
        this.getGenre();
        this.getMovies();
    }
    componentDidUpdate(){
        this.render();
    }
    
    getMovies(){
        let movieID = this.props.match.params.id;
        axios.get(`http://localhost:3000/track/${movieID}`).then(response => {
                this.setState({
                    trackid: response.data.trackid,
                    tracktitle: response.data.tracktitle,
                    releasedate: response.data.releasedate.substring(0,10),
                    ageRating: response.data.tagrestriction ? response.data.tagrestriction : 0,
                    hours: response.data.duration.hours,
                    minutes: response.data.duration.minutes
                });
            }).catch(err => console.log(err));
    }

    getGenre(){
        let movieID = this.props.match.params.id;
        axios.get(`http://localhost:3000/trackgenre/${movieID}`).then(response => {
            this.setState({
                genreID: response.data.genreid
                })
        }).catch(err => console.log(err));
        //console.log(this.state.genreID);
    }

    getMovieDet(){
        let movieID = this.props.match.params.id;
        axios.get(`http://localhost:3000/movie/${movieID}`).then(response => {
            this.setState({
                income: response.data.boxincome ? response.data.boxincome : 0
            })
        })
        .catch(err => console.log(err));
    }

    editMovie(newTrack, newMovie, newTrackGenre){
        console.log(newMovie);
        axios.request({
            method: 'put',
            url: `http://localhost:3000/track/${this.state.trackid}`,
            data: newTrack
        })
        axios.request({
            method: 'put',
            url: `http://localhost:3000/movie/${this.state.trackid}`,
            data: newMovie
        }).then(response => {
            this.props.history.push('/home');
        }).catch(err => console.log(err));

        // editanje zanra radi ali put request ne radi...
        /* axios.request({
            method: 'put',
            url: `http://localhost:3000/trackgenre/${this.state.trackid}`,
            data: newTrackGenre
        }) */
        }

    onSubmit(a){
        const newTrack = {
            trackid: parseInt(this.state.trackid),
            tracktitle: this.state.tracktitle,
            releasedate: this.state.releasedate + "T00:00:00.000Z",
            duration: this.state.hours*360 + this.state.minutes * 6 + '0',
            tagrestriction: parseInt(this.state.ageRating),
            trackrating: 0
        }
        const newMovie = {
            trackid: parseInt(this.state.trackid),
            boxincome: parseInt(this.state.income)
        }
        const newTrackGenre={
            trackid: parseInt(this.state.trackid),
            genreid: parseInt(this.refs.genreID.value)
        }
        console.log(newMovie, newTrack,newTrackGenre);
        this.editMovie(newTrack, newMovie, newTrackGenre);
        a.preventDefault();
    }
    
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    render(){  
        return (
            <div>
                <h1>Edit movie: {this.state.tracktitle}</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    ID:
                <div className="input-field inline">
                        <input type="text" ref="id" name="trackid" value={this.state.trackid} readOnly/>
                    </div>
                    <div className="input-field">
                        <input id="name" type="text" ref="title" name="tracktitle" value={this.state.tracktitle} onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="name" className="active">Title</label>
                    </div>
                    <div className="input-field inline">
                        <input name="ReleaseDate" type="text" className="datepicker" ref="releasedate" name="releasedate" value={this.state.releasedate} onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="ReleaseDate" className="active">Release Date</label>
                    </div>
                    <br />
                    Runtime:
                    <div className="input-field inline">
                        <input name="Hours" type="text" ref="hours" name="hours" value={this.state.hours} onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="Hours" className="active">Hours</label>
                    </div>
                    <div className="input-field inline">
                        <input name="Minutes" type="text" ref="minutes" name="minutes" value={this.state.minutes} onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="Minutes" className="active">Minutes</label>
                    </div>
                    <br />
                    Age Rating:
                    <div className="input-field inline">
                        <input name="rating" type="number" ref="rating" name="ageRating" value={this.state.ageRating} onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="rating"></label>
                    </div>


                    <div className="input-field">
                        <input name="income" type="number" ref="income" name="income" value={this.state.income} onChange={this.handleInputChange.bind(this)}/>
                        <label htmlFor="income" className="active">Income (USD)</label>
                    </div>
                    <div className="">
                        <label>Genre</label>
                        <select ref="genreID" id="genreid" name="genreID" value={this.state.genreID} onChange={this.handleInputChange.bind(this)} className="browser-default">
                        <option value="" disabled>Choose movie genre</option>
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
                    </div> 
                    <input type="submit" value="Save" className="btn right" />
                </form>
                <Link className="btn yellow darken-3" to="/home">Back</Link>
            
            </div>
        )
    }
}

export default EditMovie;