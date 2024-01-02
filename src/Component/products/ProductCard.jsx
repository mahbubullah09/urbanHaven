/* eslint-disable react/prop-types */
import ReactStars from "react-rating-stars-component";
import { TbListDetails } from "react-icons/tb";
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ProductCard = ({ data, setProducts }) => {
  const firstExample = {
    size: 30,
    value: data?.rating,
    edit: false,
    isHalf: true,
    
  };

  const [User,setUser] = useState();



  useEffect(() => {

     const  user = JSON.parse(sessionStorage.getItem('User'))
      setUser(user);
  },[])

  console.log(User);


  const handleCart = () =>{
    const cartItemArray = [];
    const cartItem= JSON.parse(localStorage.getItem('cart'));
    
  
    if (!cartItem){
        cartItemArray.push((data))
        window.localStorage.setItem('cart', JSON.stringify(cartItemArray))
        window.location.reload();
        toast.success('successfully added')
    }
   
    else{

       
            cartItemArray.push(...cartItem, data)
            window.localStorage.setItem('cart', JSON.stringify(cartItemArray))
            window.location.reload();
           toast.success('successfully added')

     
       
  }

  const userId =User?.id

  console.log(userId);


  }






  return (
    <motion.div
      className="box"
      /**
       * Setting the initial keyframe to "null" will use
       * the current value to allow for interruptable keyframes.
       */
      whileHover={{ scale: [null, 1.2, 1.1] }}
      transition={{ duration: 0.3 }}
    >
    <div className="   w-[23rem]  bg-white shadow-md rounded-3xl p-2 mx-1 my-3 ">
      <div className="overflow-x-hidden rounded-2xl relative">
        <img
          className="h-52 p-2 rounded-2xl w-[23rem] "
          src={data?.thumbnail}
        />
      </div>
      <div className="p-2">
        <div>
          <div className=" ">
            <span className="bg-[#96b9ec]  px-2 py-1 rounded-full text-gray-700 font-medium">
              {" "}
              {data?.category}
            </span>
          </div>

          <div className="mt-2 ">
            <p className="text-lg font-semibold  text-gray-900 mb-0">
              {data?.title}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <p className="text-md text-gray-800 mt-0">${data?.price}</p>

            <div className="mb-1 mr-4 group ">
              <ReactStars {...firstExample} />
            </div>
          </div>
          <div className="flex justify-between">
            <button
            //   onClick={() => document.getElementById("my_modal_4").showModal()}
            onClick={()=> {
                document.getElementById("my_modal_4").showModal()
                // setOpen(true);
                setProducts(data)
            
              }
            }
              className="flex items-center gap-1 py-1 px-2 bg-[#2d75e2] text-white rounded-full"
            >
              <TbListDetails />
              Details
            </button>
            <button onClick={handleCart} className=" flex items-center gap-1 py-1 px-2 bg-[#2d75e2] text-white rounded-full">
              <FaCartPlus /> Add to cart
            </button>
          </div>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {


      }
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default ProductCard;
