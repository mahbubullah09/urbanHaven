import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import  {  useContext, useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";


const Home = () => {

   
    const [search, setSearch] = useState("");
    const [product, setProducts] = useState(null)
    const [User,setUser] = useState();



    useEffect(() => {

       const  user = JSON.parse(sessionStorage.getItem('User'))
        setUser(user);
    },[])

    console.log(User);
    

  const { data = [] } = useQuery({
    queryKey: ["products", search ? search : ""],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
      return res.data.products;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearch(value);
  };


  const [sort, setSort] = useState("Default");
  const [defaltData, setDefaultData] = useState(data);

  const selectDefault = () => {
    setSort("Default");
    selectDefault(data)
    

  };

  const selectLow = () => {
    setSort("Low to high");

    data.sort((a, b) => {
      let x = parseInt(a.price);
      let y = parseInt(b.price);

      return x - y;
    });
  };

  const selectHigh = () => {
    setSort("High to low");

    data.sort((a, b) => {
      let x = parseInt(a.price);
      let y = parseInt(b.price);

      return y - x;
    });
  };
//   console.log(username);


  return (
    <div>

<div className="max-w-6xl mx-auto flex justify-center items-center">
        
        <form onSubmit={handleSearch}>
          <input
            id="searchValue"
            className="bg-[#100f0f] bg-opacity-5 text-sm  py-2 px-3 w-60 md:w-96   my-5 rounded-md border border-white"
            type="text"
            name="search"
            placeholder="  Search by Products Name"
          />
          <button className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">
            Search
          </button>
        </form>
      </div>
      <p className="flex max-w-[16rem]  justify-evenly items-center mx-4 bg-[#ffcf00] py-2 px-4 rounded-full my-4">
          <p className="text-xl">Filter By</p>
          <div className="dropdown ">
            <label tabIndex={0} className="btn m-1">
              {sort}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li onClick={selectDefault}>
                <a>Default</a>
              </li>
              <li onClick={selectLow}>
                <a>Low to high</a>
              </li>
              <li onClick={selectHigh}>
                <a>High to low</a>
              </li>
            </ul>
          </div>
        </p>
   <div className="grid grid-cols-1 min-[320]:mx-2 max-[325]:mx-4  md:grid-cols-2 lg:grid-cols-3 gap-8">
   {
    // sort === "Default"
    // ? defaltData.map((data, idx) => (
    //     <ProductCard key={idx} data={data} />
    //   ))
    //   :
   
   data?.map((data, idx) => (
        <ProductCard key={idx} data={data} setProducts={setProducts} />
      ))}
   </div>
   
   <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <div className="grid place-content-center">
            <img src={product?.thumbnail} alt="" />
          </div>
          <p className="py-4 text-center text-2xl font-semibold">
            {product?.title}
          </p>
          <p className="text-center">{product?.description}</p>
          <hr />
          <p>Brand: {product?.brand}</p>
          <p>Price: {product?.price}</p>
          <p>Ratings: {product?.rating}</p>
          <p>Discount: {product?.discountPercentage}</p>
          <p>In Stock: {product?.stock}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
