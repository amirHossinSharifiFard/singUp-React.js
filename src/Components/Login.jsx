import React, { useState, useEffect } from "react";
import styles from "./SingUp.module.css";

import { validate } from "./validate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErorrs] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErorrs(validate(data,"login"));
  }, [data, touched]);

  const changeHandler = (event) => {
  
      setData({ ...data, [event.target.name]: event.target.value });
 
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("succes your sing UP", "succes");
    } else {
      setTouched({
        password: true,
        email: true,
      });
      notify("invalid data", "error");
    }
    notify();
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <h1 className={styles.header}>Login page</h1>
        

        <div className={styles.formField}>
          <label>Email</label>
          <input
            className={
              errors.email && touched.email
                ? styles.uncompleted
                : styles.formInput
            }
            type='text'
            name='email'
            value={data.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.email && touched.email && <span> errors.email</span>}
        </div>

        <div className={styles.formField}>
          <label>Password</label>
          <input
            className={
              errors.password && touched.password
                ? styles.uncompleted
                : styles.formInput
            }
            type='password'
            name='password'
            value={data.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.password && touched.password && <span> errors.password</span>}
        </div>

      

        

        <div className={styles.formButtons}>
        <Link to='/singup'>Sing Up</Link>

          <button type='submit'>Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
