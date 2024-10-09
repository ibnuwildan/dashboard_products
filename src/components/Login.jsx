import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Navigasi ke dashboard hanya jika login sukses
    if (user && isSuccess) {
      navigate("/dashboard");
    }
    // Reset state hanya jika login sukses, tapi tidak reset otomatis jika ada error
    // if (isSuccess) {
      dispatch(reset());
    // }
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    // Hanya dispatch login jika email dan password terisi
    // if (email && password) {
      dispatch(LoginUser({ email, password }));
    // }
  };

  return (
    <div>
      <section className="hero has-background-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={Auth} className="box">
                  {/* Tampilkan pesan error jika login gagal */}
                  {isError && <p className="has-text-danger">{message}</p>}
                  <h1 className="title is-2 text-center">Sign In</h1>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        placeholder="*************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      className="button is-success is-fullwidth"
                      type="submit"
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
