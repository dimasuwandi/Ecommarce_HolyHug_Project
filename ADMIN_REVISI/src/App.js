import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './komponen/Login';
import Edit from './komponen/edit';
import Register from './komponen/register';
import Dashboard from './komponen/Dashboard';
import Products from './komponen/Products';
import Addproduct from './komponen/Addproduct';
import Category from './komponen/Category';
import EditForm from './komponen/EditForm';
import Confirm from './komponen/confirm';
import Listmember from './komponen/listmember';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/edit" component={Edit} />
        <Route path="/addproduct" component={Addproduct} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/productlist" component={Products} />
        <Route path="/editdata" component={EditForm} />
        <Route path="/categorylist" component={Category} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/listmember" component={Listmember} />
      </div>
    );
  }
}

export default App;
