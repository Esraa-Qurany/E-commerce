import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../constant/conastant";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);

  async function getCartItem() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCart(data);
      setCartId(data.cartId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCartItem(productId) {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getCartItem();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteAllCart() {
    try {
      const { data } = await axios.delete(`${baseUrl}/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      getCartItem();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function updateCartItem(productId, count) {
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/v1/cart/${productId}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getCartItem();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/cart`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getCartItem();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function CheckOut(cartId, URL, values) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${URL}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartId,
        CheckOut,
        cart,
        setCart,
        addToCart,
        getCartItem,
        deleteCartItem,
        updateCartItem,
        deleteAllCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
