import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../constant/conastant";

export const wishlistContext = createContext();
export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);

  async function getWishlistItem() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteWishlistItem(productId) {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/v1/wishlist/${productId}`,
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

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/wishlist`,
        { productId },
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

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        getWishlistItem,
        deleteWishlistItem,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
