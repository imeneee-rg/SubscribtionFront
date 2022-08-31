import React from 'react';  
import logo from './logo.svg';  
import './App.css';  
//import Layout  from './Layout/Layout'  

//import { Switch, Route, Redirect } from "react-router"; 
import { BrowserRouter, BrowserRouter as  Router,Link, Routes, Route,Switch } from "react-router-dom";
import Users from './component/Users';
//import MenuItem from 'antd/lib/menu/MenuItem';
//import { PageHeader, Menu, Breadcrumb,Affix,Badge, Switch } from 'antd';
//import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import Authentification from './component/Authenification';
import Layout from './Layout/Layout';
import Inscriptions from './component/Inscriptions';
import PrivateRoute from './component/PrivateRoute';
import Products from './component/Products';
import Periods from './component/Periods';



import ProductsItem from './component/ProductsItem';
function App() {  
  


  return (  
     <div> 

<Router>

<Switch>

     
      <Route path="/login" exact component={Authentification}/> 
      
      <Layout/>
      <PrivateRoute path="/users" roles={["admin"]} component={Users} />
      <PrivateRoute path="/inscriptions" roles={["admin"]} component={Inscriptions} />
      <PrivateRoute path="/products" roles={["admin"]} component={Products} />
      <PrivateRoute path="/productitem" roles={["admin"]} component={ProductsItem} />
      <PrivateRoute path="/periods" roles={["admin"]} component={Periods} />
        
     
      

</Switch>


</Router> 
        
    
      
      
    
      
     </div>  
  );  
}  
  
export default App;  