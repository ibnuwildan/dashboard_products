import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "../img/Logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/")
  }

  return (
    <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
             <NavLink to={"/dashboard"}>
              <img src={Logo} alt='logo'/> 
             </NavLink>
            </a>
          </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={logout} className="button is-light">
                    Logout
                  </button>
                </div>
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
