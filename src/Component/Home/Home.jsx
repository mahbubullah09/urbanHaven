import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect } from "react";
import ProductCard from "../products/ProductCard";

const Home = () => {
  const { data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products`);
      return res.data;
    },
  });

  console.log(data.products);

  return (
    <div>
      <h2>kdhfjodshf</h2>

   <div className="grid grid-cols-3 gap-8">
   {data.products?.map((data, idx) => (
        <ProductCard key={idx} data={data} />
      ))}
   </div>
    </div>
  );
};

export default Home;
