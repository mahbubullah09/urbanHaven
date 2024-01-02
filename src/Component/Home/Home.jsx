import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import {  useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Home = () => {


  //get user from session storage
  const [User, setUser] = useState();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("User"));
    setUser(user);
  }, []);

// get product from api
  const [search, setSearch] = useState("");
  const [product, setProducts] = useState(null);
  const { data = [] } = useQuery({
    queryKey: ["products", search ? search : ""],
    queryFn: async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${search}`
      );
      return res.data.products;
    },
  });

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearch(value);
  };

//show all button toggle
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  //sort product base on price
  const [sortProducts, setSortProducts] = useState(data);
  const [sortPrice, setSortPrice] = useState("Default");
  const handleSortPrice = (e) => {
    const dataCopy = [...data];
    if (e.target.value === "LH") {
      setSortPrice("LH");
      dataCopy.sort((a, b) => {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return priceA - priceB;
      });
    } else if (e.target.value === "HL") {
      setSortPrice("HL");
      dataCopy.sort((a, b) => {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return priceB - priceA;
      });
    }
    setSortProducts(dataCopy);
  };

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
      <p className="flex max-w-[16rem]  justify-evenly items-center mx-2 bg-[#ffcf00] py-2 px-4 rounded-full my-4">
        <p>Filter</p>
        <div>
          <select
            onChange={handleSortPrice}
            className="select select-warning w-full max-w-xs"
          >
            <option defaultValue="selected" value="Default">
              Default
            </option>
            <option value="LH">Low to High</option>
            <option value="HL">High to Low</option>
          </select>
        </div>
      </p>
      {
        show?
        <div className="grid grid-cols-1 min-[320]:mx-2 max-[325]:mx-4  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortPrice === "Default"
          ? 
          data?.map((data, idx) => (
                <ProductCard key={idx} data={data} setProducts={setProducts} />
              ))
              
          : sortProducts?.map((data, idx) => (
              <ProductCard key={idx} data={data} setProducts={setProducts} />
            ))}
      </div>
      :
      <div className="grid grid-cols-1 min-[320]:mx-2 max-[325]:mx-4  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortPrice === "Default"
          ? 
          data?.slice(0, 9).map((data, idx) => (
                <ProductCard key={idx} data={data} setProducts={setProducts} />
              ))
              
          : sortProducts?.slice(0, 9).map((data, idx) => (
              <ProductCard key={idx} data={data} setProducts={setProducts} />
            ))}
      </div>
      }

      <div className="mx-auto text-center mt-8">
        <button
          className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded-lg"
          onClick={handleShow}
        >
          {!show ? (
            <p className="flex justify-center gap-1 items-center">
              Show all <FaChevronDown />
            </p>
          ) : (
            <p className="flex justify-center gap-1 items-center">
              Show less <FaChevronUp />
            </p>
          )}
        </button>
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Home;
