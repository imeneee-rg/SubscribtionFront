import React, { useEffect, useState } from 'react';
import { login, selectautherror, selectauthstatus } from '../features/users/usersSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Alert, Image, message } from 'antd';
import { useHistory } from 'react-router-dom';



const Authentification = () => {


    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch()
    const autherror = useSelector(selectautherror)
    const authstatus = useSelector(selectauthstatus)
    const history = useHistory()


    const singin = () => {
        let data = {
            email: email,
            password: password

            
        }

        dispatch(login(data))
    }
    const success = () => {
      message.success('you successfuly loged in');
  };

    useEffect(() => {

      console.log('hrllo ');
      if (authstatus === 'success') {
          success()
          history.push('/home')
      }
      
  }, [authstatus]);
return (
 <div className="container">
  {/* Outer Row */}
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
          <img src="https://www.tunisie.campusfrance.org/sites/pays/files/tunisie/paiement.jpg"  width={450} height={520} />

            
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                <form className="user">
                  <div>
                  <div className="form-group">
                  {autherror.iserror && <Alert style={{ marginBottom: '10px' }} message={autherror.message} type="error" showIcon />}

                    <input value={email} onChange={(e) => setemail(e.target.value)} type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                  </div>
                  <div className="form-group">
                    <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                  </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                      <input type="checkbox" className="custom-control-input" id="customCheck" />
                      <label className="custom-control-label" htmlFor="customCheck">Remember
                        Me</label>
                    </div>
                  </div>
                  
                  <button onClick={() => singin()} className="btn btn-default">Login</button>

                                                           
                  
                  <hr />
                  <a href="index.html" className="btn btn-google btn-user btn-block">
                    <i className="fab fa-google fa-fw" /> Login with Google
                  </a>
                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                    <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                  </a>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="forgot-password.html">Forgot Password?</a>
                </div>
                <div className="text-center">
                  <a className="small" href="register.html">Create an Account!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)


}
export default Authentification;