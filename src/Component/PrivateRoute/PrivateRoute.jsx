import {  useEffect, useState } from 'react';
;
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const [User,setUser] = useState();
    const [loading, setLoading] = useState(true);



    useEffect(() => {

       const  user = JSON.parse(sessionStorage.getItem('User'))
        setUser(user);
        setLoading(false);
    },[])

    console.log(User);




    const location = useLocation();
    console.log(location);

 
    if (loading){
        return <div className=' text-center text-9xl h-[30vh]   my-[30vh]'>
             <span className="loading loading-spinner text-error loading-lg"></span>
         </div>
     }

    

    if(User?.username){
        return children;
    }
    return <Navigate state={location.pathname} to='login' replace ></Navigate>
};

export default PrivateRoute;