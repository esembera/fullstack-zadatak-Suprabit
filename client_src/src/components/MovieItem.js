import React, {Component} from "react";


class MovieItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            item:props.item
        }
    }

    render(){
        return(
            <a href={`/movie/${this.state.item.trackid}`} className="collection-item">
                {this.state.item.tracktitle}
            </a>
        )
    }


}

export default MovieItem;