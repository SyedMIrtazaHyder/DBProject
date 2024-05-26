import { useEffect, useState } from "react";
import axios from "axios";
import ShippingModal from "../popup/ShippingModal"; // Adjust the path as necessary

var url = 'http://localhost:5000'

const OrderDetail = () => {
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    var val = 0;
    const fetchData = async () => {
      const response = await axios.get(url+'/items', {
        params:{
          query_type: "SalesInfo"
        }
      })
      for (let i = 0; i < response.data.message.length; i++)
        val = val + parseFloat(response.data.message[i].Sales_Profit), total;
      setTotal(val);
      setOrders(response.data.message)
    }
    fetchData();
  }, [update]); // Em

  return (
    <div>
      <div>
        <div className="py-5">
          {/* text  */}
          <h1 className=" text-xl text-red-300 font-bold">All Sales</h1>
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
                Sale ID
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                User
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Product
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
                Quantity
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Sales Profit
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>
        {/* Use .map to generate table rows */}
            {orders.map((item, index) => {
              const { SalesID, User, Product_Name, Price, Quantity, Sales_Profit } = item;
              return(
              <tr key={index} className="text-red-300">
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 ">
                  {SalesID}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 ">
                  {User}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {Product_Name}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {Price}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {Quantity}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {Sales_Profit}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                  Fulfill
                </td>
              </tr>
            )})
          }
          <tr className="text-red-300">
            <td className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-100 text-slate-700 bg-slate-100">
              Total Profit
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
              
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
              $$$ {total.toFixed(2)}
            </td>
          </tr>

          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
