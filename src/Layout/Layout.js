import React, { Component, Suspense } from 'react';  
import Leftside from './Leftside';  
import Header from './Header'  
import Footer from './Footer'  
import { BrowserRouter, BrowserRouter as  Router,Link, Routes, Route,Switch } from "react-router-dom";
import Users from '../component/Users';
import Inscriptions from '../component/Inscriptions';
import Products from '../component/Products';
import Periods from '../component/Periods';
import { filterprice, selectproducts } from '../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductsItem from '../component/ProductsItem';




const Layout = () => { 
   // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
   const dispatch = useDispatch()
   const products = useSelector(selectproducts)
        return (  
            <div >  
                <div id="wrapper">  
                    <Leftside></Leftside>  
                    <div id="content-wrapper" class="d-flex flex-column">  
                        <div id="content">  
                            <Header />  
                             
                        </div> 
                        <div id="content">  

                       
                       
                        <Router>

<Switch>

     
      <Route path="/users" exact component={Users}/> 
      <Route path="/inscriptions" exact component={Inscriptions}/> 
      <Route path="/products" exact component={Products}/> 
      <Route path="/productitem" exact component={ProductsItem}/> 
      
      <Route path="/periods" exact component={Periods}/> 
     
      

</Switch>

</Router> 
                             
                        </div>   
                        <Footer />  
                    </div>  
                </div>  
            </div>  
        )  
    }  

  
export default Layout