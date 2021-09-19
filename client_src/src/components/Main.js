import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movie from './Movie';
import Home from './Home';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import Login from './/Login';
import ProtectedRoute from '../auth/protected-route';

const Main = () => (

<main>
    <Switch>
        <Route exact path ="/" component={Login} />
        <ProtectedRoute exact path ="/home" component={Home}/>
        <ProtectedRoute exact path = "/movie/edit/:id" component={EditMovie}/>
        <ProtectedRoute exact path = "/movie/add" component={AddMovie}/>
        <ProtectedRoute exact path ="/movie/:id" component={Movie}/>
        
    </Switch>
</main>
)

export default Main;