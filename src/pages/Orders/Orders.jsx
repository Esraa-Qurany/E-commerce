import React, { useEffect } from "react";
import { baseUrl } from "../../constant/conastant";
import axios from "axios";

export default function Orders() {
  async function getAllOrders() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/orders/`);
      console.log("data :", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="container mx-auto pt-20">
      Lorem ipsum dolor sit amet consectetur.
    </div>
  );
}
