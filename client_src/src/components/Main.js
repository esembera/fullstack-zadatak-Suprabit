import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movie from './Movie';
import Home from './Home';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import Login from './/Login';

const Main = () => (

<main>
    <Switch>
        {//<Route exact path ="/" component={Login} />
        }<Route exact path ="/" component={Home}/>
        <Route exact path = "/movie/edit/:id" component={EditMovie}/>
        <Route exact path = "/movie/add" component={AddMovie}/>
        <Route exact path ="/movie/:id" component={Movie}/>
        
    </Switch>
</main>
)

export default Main;