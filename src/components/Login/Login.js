import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './LoginManger';


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  initializeLoginFrameWork();
  // Page  call back part
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory()
  const location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponses(res, true)
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponses(res, true)
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponses(res, false)
      })
  }

  const handleResponses = (res, shouldRedirect) => {
    setUser(res)
    setLoggedInUser(res)
    if(shouldRedirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {

      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponses(res, true)
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponses(res, true)
        })
    }
    e.preventDefault()
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign In using Google</button>
      } <br />
      <button onClick={fbSignIn}>Sign in with Facebook</button>
      <br /> <br />
      {
        user.isSignIn && <div>
          <img src={user.photo} alt="" />
          <h1>Welcome ! {user.name}</h1>
          <p>Your email: {user.email}</p>

        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New userSignUp</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input name='name' type="text" onBlur={handleBlur} placeholder="Your name" />} <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your email address" required /> <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>New user {newUser ? 'created' : 'logged in'} Successfully</p>
      }
    </div>
  );
}

export default Login;