import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDetail";
import { useState, useEffect } from "react"
import axios from "axios"

var url = 'http://localhost:5000'

const AdminDashboard = () => {
  var [userDetails, setUserDetails] = useState({
    Name: "",
    Email: "",
  })

  useEffect(() => {
    const fetchData = async () =>
      {
        var user_data = await axios.get(url + '/getUser', {
          params : {
            UserID: localStorage.getItem('currentUser'),
          }
        })
        setUserDetails(user_data.data)
      };
    fetchData();
    }, []); // Em

  return (
    <div>
      {/* Top */}
      <div className="top mb-5 px-5 mt-5">
        <div className=" bg-red-50 py-5 border border-red-100 rounded-lg">
          <h1 className=" text-center text-2xl font-bold text-red-500">
            Admin Dashboard
          </h1>
        </div>
      </div>
      <div className="px-5">
        {/* Mid  */}
        <div className="mid mb-5">
          {/* main  */}
          <div className=" bg-red-50 py-5 rounded-xl border border-red-100">
            {/* image  */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt=""
              />
            </div>
            {/* text  */}
            <div className="">
              <h1 className=" text-center text-lg text-red-500">
                <span className=" font-bold">Name : {userDetails.Name}</span>
              </h1>
              <h1 className=" text-center text-lg text-red-500">
                <span className=" font-bold">Email : {userDetails.Email}</span>
              </h1>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="">
          <Tabs>
            <TabList className="flex flex-wrap -m-4 text-center justify-center">
              {/* Total Products */}
              <Tab className="p-4 md:w-1/4 sm:w-1/4 w-full cursor-pointer">
                <div className=" border bg-red-50 hover:bg-red-100 border-red-100 px-4 py-3 rounded-xl">
                  <div className="text-red-500 w-12 h-12 mb-3 inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shopping-basket"
                    >
                      <path d="m5 11 4-7" />
                      <path d="m19 11-4-7" />
                      <path d="M2 11h20" />
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                      <path d="m9 11 1 9" />
                      <path d="M4.5 15.5h15" />
                      <path d="m15 11-1 9" />
                    </svg>
                  </div>
                  <h2 className=" text-red-500  font-bold">
                    Products
                  </h2>
                  {/* <p className=" text-red-500  font-bold">Total Products</p> */}
                </div>
              </Tab>
              {/* Total Order  */}
              <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className=" border bg-red-50 hover:bg-red-100 border-red-100 px-4 py-3 rounded-xl">
                  <div className="text-red-500 w-12 h-12 mb-3 inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-list-ordered"
                    >
                      <line x1={10} x2={21} y1={6} y2={6} />
                      <line x1={10} x2={21} y1={12} y2={12} />
                      <line x1={10} x2={21} y1={18} y2={18} />
                      <path d="M4 6h1v4" />
                      <path d="M4 10h2" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                  </div>
                  <p className=" text-red-500  font-bold">Total Order</p>
                </div>
              </Tab>
              {/*
              <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className=" border bg-red-50 hover:bg-red-100 border-red-100 px-4 py-3 rounded-xl">
                  <div className="text-red-500 w-12 h-12 mb-3 inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <p className=" text-red-500  font-bold">Total User</p>
                </div>
              </Tab>
              <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className=" border bg-red-50 hover:bg-red-100 border-red-100 px-4 py-3 rounded-xl">
                  <div className="text-red-500 w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="50" x2="21" y2="21"></line>
                    <line x1="15" y1="4" x2="15" y2="10"></line>
                    <line x1="9" y1="4" x2="9" y2="10"></line>
                    <line x1="5" y1="14" x2="19" y2="14"></line>
                  </svg>
                  </div>
                  <p className=" text-red-500  font-bold">Sales History</p>
                </div>
              </Tab> */}
            </TabList>
            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            {/* <TabPanel>
              <UserDetail />
            </TabPanel> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
