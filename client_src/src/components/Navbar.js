import React, {Component} from 'react';
class Navbar extends Component{
    render(){
        return (
            <div>
                <nav>
                <div className="yellow darken-3 nav-wrapper">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/movie/add'>Add Movie</a></li>
                        {/* <li><nav>
                            <div className="yellow darken-3 nav-wrapper">
                            <form>
                                <div className="input-field">
                                <input id="search" type="search" required/>
                                <label className="label-icon" htmlFor="search"><i className="material-icons left">search</i></label>
                                <i className="material-icons">close</i>
                                </div>
                        </form>
                        </div>
                        </nav></li> */}
                    </ul>
                    
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;