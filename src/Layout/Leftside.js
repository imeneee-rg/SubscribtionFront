import React, { Component } from 'react'  
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  
import { selectautheduser, selectisauth } from '../features/users/usersSlice';
const Leftside = () => { 
   
    const isauth = useSelector(selectisauth)

    const user = useSelector(selectautheduser)

    const PrivateNavItemByRole = ({ url, text, roles }) => {
        if (isauth && roles.includes(user.__t)) {
            return <div >
                <a class="nav-link"  href={url} >{text}</a>
                </div>
        } else {
            return null
        }
    }
    

    const dispatch = useDispatch()
        return (  
            <div id="wrapper">  
                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">  
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">  
                        <div class="sidebar-brand-text mx-3">KHALLASLI </div>  
                    </a>  
  
                    <hr class="sidebar-divider my-0" />  
  
                    <li class="nav-item active">  
                        <a class="nav-link" href="index.html">  
                            <i class="fas fa-fw fa-tachometer-alt"></i>  
                            <span>Dashboard</span></a>  
                    </li>  
                    <hr class="sidebar-divider" />  
                   {/* <div class="sidebar-heading">  
                        Interface  
        </div>  */}
                    <li class="nav-item">  
                    
                    
                        <a class="nav-item active" href="/users" >  
                       


                           {/* <i class="fas fa-fw fa-cog"></i> */}  
    
                           {/*<i class="fas fa-fw fa-table"></i>*/}
                                
          <PrivateNavItemByRole url='/users' text="List of users " roles={["admin"]} >
          
          </PrivateNavItemByRole> 
                              
          
          
  
                           
                        </a>  
                        {/*<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Custom Components:</h6>  
                                <Link class="collapse-item" to="/home">Buttons</Link>  
                                <Link class="collapse-item" to="/button">Chart</Link>  
                            </div>  
    </div>  */}
                    </li>  


                    <li class="nav-item">  
                        <a class="nav-item active" href="/inscriptions" >  
                           {/* <i class="fas fa-fw fa-wrench"></i> <i class="fas fa-fw fa-table"></i> */}
                           {/* <span>List of inscriptions</span>  */}
                           <PrivateNavItemByRole url='/inscriptions' text="List of inscriptions " roles={["admin"]} >
          
          </PrivateNavItemByRole>
                        </a>  
                        {/*<div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Custom Utilities:</h6>  
                                <a class="collapse-item" href="utilities-color.html">Colors</a>  
                                <a class="collapse-item" href="utilities-border.html">Borders</a>  
                                <a class="collapse-item" href="utilities-animation.html">Animations</a>  
                                <a class="collapse-item" href="utilities-other.html">Other</a>  
                            </div>  
</div>    
                    </li>  
                    <hr class="sidebar-divider" />  
  
                    <div class="sidebar-heading">  
                        Addons  
</div>  
                    <li class="nav-item">  
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">  
                            <i class="fas fa-fw fa-folder"></i>  
                            <span>Pages</span>  
                        </a>  
                        <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Login Screens:</h6>  
                                <a class="collapse-item" href="login.html">Login</a>  
                                <a class="collapse-item" href="register.html">Register</a>  
                                <a class="collapse-item" href="forgot-password.html">Forgot Password</a>  
                                <div class="collapse-divider"></div>  
                                <h6 class="collapse-header">Other Pages:</h6>  
                                <a class="collapse-item" href="404.html">404 Page</a>  
                                <a class="collapse-item" href="blank.html">Blank Page</a>  
                            </div>  
                        </div>  
                    </li>  
                    <li class="nav-item">  
                        <Link class="nav-link" to="/color"> <i class="fas fa-fw fa-chart-area"></i>Colors</Link>  
                        {/* <a class="nav-link" href="charts.html"> 
                            <i class="fas fa-fw fa-chart-area"></i> 
                            <span>Charts</span></a> */}  
                    </li>  
                    

                    <li class="nav-item">  
                        <a class="nav-item active" href="/inscriptions" >  
                           {/* <i class="fas fa-fw fa-wrench"></i> <i class="fas fa-fw fa-table"></i> */}
                           {/* <span>List of inscriptions</span>  */}
                           <PrivateNavItemByRole url='/periods' text="List of Periods" roles={["admin"]} >
          
          </PrivateNavItemByRole>
                        </a>  
                        {/*<div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Custom Utilities:</h6>  
                                <a class="collapse-item" href="utilities-color.html">Colors</a>  
                                <a class="collapse-item" href="utilities-border.html">Borders</a>  
                                <a class="collapse-item" href="utilities-animation.html">Animations</a>  
                                <a class="collapse-item" href="utilities-other.html">Other</a>  
                            </div>  
</div>    
                    </li>  
                    <hr class="sidebar-divider" />  
  
                    <div class="sidebar-heading">  
                        Addons  
</div>  
                    <li class="nav-item">  
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">  
                            <i class="fas fa-fw fa-folder"></i>  
                            <span>Pages</span>  
                        </a>  
                        <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Login Screens:</h6>  
                                <a class="collapse-item" href="login.html">Login</a>  
                                <a class="collapse-item" href="register.html">Register</a>  
                                <a class="collapse-item" href="forgot-password.html">Forgot Password</a>  
                                <div class="collapse-divider"></div>  
                                <h6 class="collapse-header">Other Pages:</h6>  
                                <a class="collapse-item" href="404.html">404 Page</a>  
                                <a class="collapse-item" href="blank.html">Blank Page</a>  
                            </div>  
                        </div>  
                    </li>  
                    <li class="nav-item">  
                        <Link class="nav-link" to="/color"> <i class="fas fa-fw fa-chart-area"></i>Colors</Link>  
                        {/* <a class="nav-link" href="charts.html"> 
                            <i class="fas fa-fw fa-chart-area"></i> 
                            <span>Charts</span></a> */}  
                    </li> 


                    <li class="nav-item">  
                        <a class="nav-item active" href="/inscriptions" >  
                           {/* <i class="fas fa-fw fa-wrench"></i> <i class="fas fa-fw fa-table"></i> */}
                           {/* <span>List of inscriptions</span>  */}
                           <PrivateNavItemByRole url='/products' text="List of products " roles={["admin"]} >
          
          </PrivateNavItemByRole>
                        </a>  
                        {/*<div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Custom Utilities:</h6>  
                                <a class="collapse-item" href="utilities-color.html">Colors</a>  
                                <a class="collapse-item" href="utilities-border.html">Borders</a>  
                                <a class="collapse-item" href="utilities-animation.html">Animations</a>  
                                <a class="collapse-item" href="utilities-other.html">Other</a>  
                            </div>  
</div>    
                    </li>  
                    <hr class="sidebar-divider" />  
  
                    <div class="sidebar-heading">  
                        Addons  
</div>  
                    <li class="nav-item">  
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">  
                            <i class="fas fa-fw fa-folder"></i>  
                            <span>Pages</span>  
                        </a>  
                        <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">  
                            <div class="bg-white py-2 collapse-inner rounded">  
                                <h6 class="collapse-header">Login Screens:</h6>  
                                <a class="collapse-item" href="login.html">Login</a>  
                                <a class="collapse-item" href="register.html">Register</a>  
                                <a class="collapse-item" href="forgot-password.html">Forgot Password</a>  
                                <div class="collapse-divider"></div>  
                                <h6 class="collapse-header">Other Pages:</h6>  
                                <a class="collapse-item" href="404.html">404 Page</a>  
                                <a class="collapse-item" href="blank.html">Blank Page</a>  
                            </div>  
                        </div>  
                    </li>  
                    <li class="nav-item">  
                        <Link class="nav-link" to="/color"> <i class="fas fa-fw fa-chart-area"></i>Colors</Link>  
                        {/* <a class="nav-link" href="charts.html"> 
                            <i class="fas fa-fw fa-chart-area"></i> 
                            <span>Charts</span></a> */}  
                    </li> 
                     
                      
                 
                </ul>  
            </div>  
        )  
    
        
}  
  
export default Leftside