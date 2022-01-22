import { useState, useEffect } from "react";
// import logo from './logo.svg';
import './App.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

import {
  ApolloClient,
  gql,
  useQuery
} from '@apollo/client';


function App() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [getData, setGetData] = useState(false);
  const [books, getBooks] = useState([])

  const auth = getAuth()
  const registerUser = async () => {
    try {
      console.log("register")
      const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password, formData.name)
      // const token = await user.user.getIdToken()
      // console.log(await user.user.getIdToken())
    } catch (error) {
      console.log(error);
    }
  }

  const signIn = async () => {
    try {
      console.log("signin")
      const user = await signInWithEmailAndPassword(auth, formData.email, formData.password, formData.name)
      // console.log(await user.user.getIdToken())
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
      // console.log(await user.user.getIdToken())

    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('token')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        console.log("token", token)
        localStorage.setItem('token', token);
        setGetData(true)
      }
      console.log('hello auth state changed')
    })
  }, [auth])

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
    }
  }`




  const data  = useQuery(GET_BOOKS)
  console.log(data);
  return (
    <div>
      <div>
        <label>email</label>
        <input name="email" type="email" onChange={handleChange}></input>
        <label>username</label>
        <input name="name" type="text" onChange={handleChange}></input>
        <label>password</label>
        <input name="password" type="text" onChange={handleChange}></input>
        <button type="submit" onClick={signIn}>Signin</button>
        <button type="submit" onClick={registerUser}>Signup</button>
        <button type="submit" onClick={loginWithGoogle}>Google</button>
        <button type="submit" onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default App;
