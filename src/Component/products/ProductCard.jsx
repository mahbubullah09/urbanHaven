import ReactStars from "react-rating-stars-component";
import { TbListDetails } from "react-icons/tb";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ data }) => {
  const firstExample = {
    size: 30,
    value: data?.rating,
    edit: false,
    isHalf: true,
  };

  return (
    
      <div className="    w-[23rem]  bg-white shadow-md rounded-3xl p-2 mx-1 my-3 ">
        <div className="overflow-x-hidden rounded-2xl relative">
          <img
            className="h-52 p-2 rounded-2xl w-[23rem] "
            src={data?.thumbnail}
          />
        </div>
        <div className="p-2">
        <div>
          <div className=" ">
            <span className="bg-lime-200 px-2 py-1 rounded-full text-gray-700">
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
            <button onClick={()=>document.getElementById('my_modal_4').showModal()} className="flex items-center gap-1 py-1 px-2 bg-gray-500 rounded-full"><TbListDetails />Details</button>
            <button className=" flex items-center gap-1 py-1 px-2 bg-gray-500 rounded-full"><FaCartPlus /> Add to cart</button>
          </div>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-2xl">
    <div className="grid place-content-center">
    <img src={data?.thumbnail} alt="" />
    </div>
    <p className="py-4 text-center text-2xl font-semibold">{data?.title}</p>
    <p className="text-center">{data?.description}</p>
    <hr />
    <p>Brand: {data?.brand}</p>
    <p>Price: {data?.price}</p>
    <p>Ratings: {data?.rating}</p>
    <p>Discount: {data?.discountPercentage}</p>
    <p>In Stock: {data?.stock}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
