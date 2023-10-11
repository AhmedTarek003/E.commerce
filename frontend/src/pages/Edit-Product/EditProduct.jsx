import { useEffect, useState } from "react";
import "./editProduct.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  updatetProductImage,
} from "../../redux/apiCalls/productsApiCall";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm/ProductForm";

const EditProduct = () => {
  const [images, setImages] = useState(0);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductById(id));
  }, [dispatch, id]);

  // Handle Images swipper
  const handleImages = (index) => {
    setImages(index);
  };
  // Updated Images
  const updatedImages = () => {
    const formData = new FormData();
    if (image) {
      image.forEach((file, index) => {
        formData.append(`image`, file);
      });
      dispatch(updatetProductImage(id, formData));
    } else {
      toast.error("you must add image first");
    }
  };

  return (
    <section className="edit-prdocut">
      <div className="edit-product-contaienr">
        <h1 className="edit-product-title">Edit Product</h1>
        <div className="edit-produt-container">
          <div className=" images-of-products">
            <div className="add-product-images">
              <label
                htmlFor="add-image-product"
                className="add-image-product-btn"
              >
                Upload images
              </label>
              <input
                type="file"
                multiple
                id="add-image-product"
                style={{ display: "none" }}
                onChange={(e) => setImage(Array.from(e.target.files))}
              />
            </div>
            {image ? (
              <div className="product-images" style={{ marginTop: "12px" }}>
                <div className="product-image-tumps">
                  {image?.map((image, index) => (
                    <div className="images-edit-containers" key={index}>
                      <div
                        className="thumps-image"
                        onClick={() => handleImages(index)}
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt=""
                          className="thump-image"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="product-main-image">
                  {image?.map((image, index) => (
                    <div
                      className="product-img-main-image"
                      key={index}
                      style={{ transform: `translateX( -${images * 100}%)` }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="main-img-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="product-images" style={{ marginTop: "12px" }}>
                <div className="product-image-tumps">
                  {product?.images?.map((image, index) => (
                    <div className="images-edit-containers" key={index}>
                      <div
                        className="thumps-image"
                        onClick={() => handleImages(index)}
                      >
                        <img src={image?.url} alt="" className="thump-image" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="product-main-image">
                  {product?.images?.map((image, index) => (
                    <div
                      className="product-img-main-image"
                      key={index}
                      style={{ transform: `translateX( -${images * 100}%)` }}
                    >
                      <img src={image?.url} alt="" className="main-img-image" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="updated-product-image" onClick={updatedImages}>
              <button className="updated-product-image-btn">Updated</button>
            </div>
          </div>
          {product && <ProductForm product={product} id={id} />}
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
