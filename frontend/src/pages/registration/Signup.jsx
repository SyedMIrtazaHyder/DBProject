/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import {useState} from "react"
import axios from "axios"

var url = 'http://localhost:5000'

function signUpBackend(name, email, password){
  var credentials = {name, email, password}
  axios.post(url + '/signup', credentials)
  .then((response) => {
    console.log('Response from backend:', response.data);
  })
  .catch((error) => {
    console.error('Error sending data:', error);
  });
}

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    signUpBackend(name, email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-red-50 px-1 lg:px-8 py-6 border border-red-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-red-500 ">
            Signup
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Signup
          </button >
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
