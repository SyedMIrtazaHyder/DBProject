import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

var url = 'http://localhost:5000'

const HomePageProductCard = () => {
  const [productData, setProductData] = useState([]); // Set initial empty array

  const navigate = useNavigate();
  // Simulate data fetching (replace with your actual data fetching logic)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url+'/items', {
        params:{
          query_type: "Top 8"
        }
      })
      setProductData(response.data.message)
      //setProductData(response); // Update data state after fetching
    };
    fetchData();
  }, []); // Em

  const handleOnClick = async (ProductID) => {
    console.log(ProductID)
    const cacheData = await axios.get(url + '/cacheProduct', {
      params:{
        ProductID: ProductID,
      }
    })
    console.log(cacheData.data)
    localStorage.setItem('cacheProduct', JSON.stringify(cacheData.data))//cacheData.data)
    navigate('/productinfo')
  }
  //productData.data.item_list
  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Latest Products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productData.map((item) => {
              const { ProductID, Image_url, Product_Name, Price, Brand, Product_Type } = item;
              return (
                <div key={ProductID} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      className="lg:h-80  h-96 w-full"
                      src={Image_url}
                      alt="blog"
                      onClick={ () => handleOnClick(ProductID)}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {Product_Type} {Brand? "| " + Brand: ""} 
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {Product_Name.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ${Price.toFixed(2)}
                      </h1>

                      <div className="flex justify-center ">
                        <button className=" bg-red-500 hover:bg-red-600 w-full hover:size-50 text-white py-[4px] rounded-lg font-bold"
                        onClick={ () => handleOnClick(ProductID)}>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
