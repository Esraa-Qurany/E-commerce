import React, { useEffect, useState } from "react";
import { baseUrl } from "../../constant/conastant";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  const token = localStorage.getItem("token");
  const { id: userId } = jwtDecode(token);
  async function getAllOrders() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/orders/user/${userId}`
      );
      setLoading(false);
      setOrders(data);

      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="container mx-auto pt-20">
      <div className="bg-gray-100 rounded-md p-10">
        {orders?.map((user) => (
          <div className="flex justify-between font-medium items-center border-b border-dashed py-3">
            <p>name : {user?.user?.name}</p>
            <p>phone : {user?.user?.phone}</p>
            <p>city : {user?.shippingAddress?.city}</p>
          </div>
        ))}
        <h3 className="text-3xl font-medium text-center pt-2">your Order</h3>
        {loading ? (
          <h2 className="text-2xl py-4 font-medium">loading...</h2>
        ) : (
          <div>
            {orders?.map((order) => (
              <div>
                <div key={order._id} className=" py-4 border-b">
                  {order?.cartItems.map((item) => (
                    <div
                      className="flex flex-col gap-10 md:flex-row  items-center"
                      key={item?._id}
                    >
                      <img
                        className="p-2 w-96 md:w-48"
                        src={item?.product?.imageCover}
                        alt={item?.product?.title}
                      />
                      <div className="font-medium ">
                        <h3 className="text-xl py-2">
                          {item?.product?.title}
                        </h3>
                        <p>{item?.price}EGP</p>
                        <p className="py-2">
                          number of product :{" "}
                          <span className="text-green-500">{item?.count}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center font-semibold text-xl  py-3">
                  total order price :{" "}
                  <span className="text-green-500">
                    {order?.totalOrderPrice}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
