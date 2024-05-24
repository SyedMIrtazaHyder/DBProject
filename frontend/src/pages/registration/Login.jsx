/* eslint-disable react/no-unescaped-entities */
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react"
import axios from "axios"

var url = 'http://localhost:5000'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const[validLogin, setValidLogin] = useState(false)
  const nav = useNavigate();

  const handleSubmit = async () => {
    const validLogin = await axios.get(url + '/login', {
      params:{
        email: email,
        password: password
      }
    })

  //CheckLogin(email, password);
    if (validLogin.data.message){
      localStorage.setItem('isLoggedIn', true); // Store login state in local storage (for simplicity)
      nav('/')
    }
    else{
      console.log("Invalid Password or Account Does not Exist")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-red-50 px-1 lg:px-8 py-6 border border-red-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-red-500 ">
            Login
          </h2>
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input Three  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md "
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
