import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import { useState, useEffect } from "react"
import axios from "axios";

var url = 'http://localhost:5000'

const CartPage = () => {
  const [productData, setProductData] = useState([]); // Set initial empty array
  const [productDataChanged, setProductDataChanged] = useState(false); // Set initial empty array
  const [totalPrice, setPrice] = useState(0)

  var user = localStorage.getItem('currentUser')
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url+'/items', {
        params:{
          query_type: "Cart Items",
          user: user,
        }
      })
      console.log(response.data.message)
      setProductData(response.data.message)
      setPrice(response.data.totalPrice)
      //setProductData(response); // Update data state after fetching
    };
    fetchData();
  }, [productDataChanged]); // Em

  const handleDelete = async (ProductID) => {
    console.log(ProductID)
    await axios.post(url + '/removeFromCart', {ProductID, user})
    .then((response) => {
      console.log('Response from backend:', response.data);
      setProductDataChanged(!productDataChanged)
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
  }

  const handleChange = async (ProductID, quantity) => {
    if (quantity.length > 0){
      await axios.post(url + '/changeQuantity', {ProductID, user, quantity})
      .then((response) => {
        console.log('Response from backend:', response.data);
        setProductDataChanged(!productDataChanged)
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
    }
    else{
      console.log("Please write valid Quantity")
    }
  }


  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {productData.map((product) => (
                  <div key={product.ProductID} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={product.Image_url}
                          alt={product.Product_Name}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-semibold text-black"
                                >
                                  {product.Product_Name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-sm text-gray-500">
                                {product.Product_Type}
                              </p>
                              {product.Brand ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                  {product.Brand}
                                </p>
                              ) : null}
                            </div>
                            <div className="mt-1 flex items-end">
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp;{"$ " + (product.Price.toFixed(2))}
                              </p>
                              &nbsp;&nbsp;
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex justify-center">
                        {/* <button type="button" className="h-7 w-7">
                          -
                        </button> */}
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          defaultValue={product.Quantity}
                          onChange={(event) => handleChange(product.ProductID, event.target.value)}
                        />
                        {/* <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                        >
                          +
                        </button> */}
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                          onClick={() => handleDelete(product.ProductID)}
                        >
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Price ({productData.length} item)</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      $ {totalPrice}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $ {totalPrice}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    <button className="w-full px-4 py-3 text-center text-gray-100 bg-red-600 border border-transparent dark:border-gray-700 hover:border-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl">
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
