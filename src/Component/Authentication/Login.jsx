
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";



const Login = () => {
    useEffect(()=>{
        sessionStorage.clear();
            },[]);
    const navigate = useNavigate();

    const handleLogIn = (e) => {
        e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

    fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: email,
    password: password,
    // expiresInMins: 60, // optional
  })
})
.then(res => res.json())
.then(result => { console.log(result);
    if(result.token)
        {
            sessionStorage.setItem('User',JSON.stringify(result));
            navigate(location.state ? location.state : '/')
            toast.success('Successfully login')
    }
   else toast.error('Invalid username or password')
});  
    


}

    
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-[url('https://i.ibb.co/Ptssd06/Screenshot-2023-12-31-214413.png')]">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <div className="bg-white p-2 rounded-2xl">
                <p className=" text-4xl text-yellow-600 font-bold">
                  urban<span className="text-black">Haven</span>
                </p>
              </div>
            </div>
            <form onSubmit={handleLogIn} >
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none focus:bg-white focus:text-black bg-yellow-400 bg-opacity-50 px-6 py-2  text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  placeholder="User Name"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none focus:bg-white focus:text-black bg-yellow-400 bg-opacity-50 px-6 py-2  text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
