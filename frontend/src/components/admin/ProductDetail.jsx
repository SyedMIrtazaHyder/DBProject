import { useEffect, useState } from "react";
import axios from "axios";
import ShippingModal from "../popup/ShippingModal"; // Adjust the path as necessary

var url = 'http://localhost:5000'

const ProductDetail = () => {
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    Product_Type : "",
    Product_Name : "",
    Brand : "",
    Price : 0,
    Product_Description : "",
    Stock : 0,
    Rating : "",
    Image_url : "",
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(productDetails)
    closeModal();
  };

  const handleDelete = async (ProductID) => {
    console.log("Deleting Product ", ProductID)
    const response = await axios.post(url + "/removeItem", {ProductID});
    console.log(response)
    setIsOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url+'/items', {
        params:{
          query_type: "All"
        }
      })
      setProducts(response.data.message)
    }
    fetchData();
  }, [isOpen]); // Em

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-red-300 font-bold">All Product</h1>
        {/* Add Product Button  */}
        <button className="px-5 py-2 bg-red-50 border border-red-100 rounded-lg hover:bg-orange-100 border-order-100"
        onClick={openModal}>
          Add Product
        </button>
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-red-100 text-red-400">
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Type
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Price
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Stock
              </th>
            </tr>
        {/* Use .map to generate table rows */}
        {products.map((item) => {
          const { ProductID, Product_Name, Price, Product_Type, Stock } = item;
          return(
          <tr key={ProductID} className="text-red-300">
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 ">
              {ProductID}
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              {Product_Name}
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              {Product_Type}
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              {Price.toFixed(2)}
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              {Stock}
            </td>
          </tr>
        )})
      }
        </tbody>
        </table>
      </div>
      <ShippingModal
        isOpen={isOpen}
        closeModal={closeModal}
        productDetails={productDetails}
        setProductDetails={setProductDetails}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductDetail;
