import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constant/conastant";

export function BrandDetails({ openModal, setOpenModal, brandId }) {
  const [brandData, setBrandData] = useState([]);
  async function getBrandDatails() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/brands/${brandId}`);
      setBrandData(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBrandDatails();
  }, []);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className=" flex justify-between items-center ">
            <div>
              <h1 className="font-semibold text-4xl text-center py-4 text-green-500">
                {brandData?.name}
              </h1>
              <p>{brandData?.slug}</p>
            </div>
            <img src={brandData?.image} alt={brandData?.name} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => setOpenModal(false)}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
