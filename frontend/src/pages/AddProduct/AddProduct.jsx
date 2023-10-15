import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../components/Admin-Sidebar/Sidebar";
import "./addProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/apiCalls/productsApiCall";
import Loading from "../../components/Loading/Loading";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategories] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, SetPrice] = useState(0);
  const [stock, SetStock] = useState(0);
  const [dataColor, setDataColor] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [images, setImages] = useState(0);
  const [image, setImage] = useState(null);

  // Handle colors
  const colorsHandler = () => {
    if (color.trim() !== "") {
      const find = dataColor.find((a) => a === color.trim());
      if (find) {
        const filterColors = dataColor.filter((a) => a !== color.trim());
        setDataColor(filterColors);
        setColor("");
      } else if (find === undefined) {
        setDataColor([...dataColor, color]);
        setColor("");
      }
    }
  };
  // Handle size
  const sizeHandler = () => {
    if (size.trim() !== "") {
      const find = dataSize.find((a) => a === size.trim());
      if (find) {
        const filterSize = dataSize.filter((a) => a !== size.trim());
        setDataSize(filterSize);
        setSize("");
      } else if (find === undefined) {
        setDataSize([...dataSize, size]);
        setSize("");
      }
    }
  };
  // Add Handler
  const addHandler = () => {
    if (color.trim() !== "" || size.trim() !== "") {
      colorsHandler();
      sizeHandler();
    } else {
      toast.warn("you must write a color or size");
    }
  };
  // Handle Images swipper
  const handleImages = (index) => {
    setImages(index);
  };
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const categories = category.join("").split(" ");
    if (title.trim() === "") return toast.error("title is required");
    if (desc.trim() === "") return toast.error("desc is required");
    if (categories.join("") === "")
      return toast.error("you must add a category");
    if (stock <= 0 || stock === undefined)
      return toast.error("stock is required and more than zero");
    if (price <= 0 || price === undefined)
      return toast.error("price is required and more than zero");
    if (dataColor.length <= 0) return toast.error("you must add a color");
    if (dataSize.length <= 0) return toast.error("you must add a size");
    if (image === null) return toast.error("please add images");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("stock", stock);
    image.forEach((file, index) => {
      formData.append(`image`, file);
    });
    categories.forEach((categories, index) => {
      formData.append(`categories`, categories);
    });
    dataSize.forEach((size, index) => {
      formData.append(`size`, size);
    });
    dataColor.forEach((color, index) => {
      formData.append(`color`, color);
    });
    dispatch(createProduct(formData));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="add-prdocut">
      <Sidebar />
      <div className="add-product-contaienr">
        <h1 className="edit-product-title">Add Product</h1>
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
            {image && (
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
            )}
          </div>
          <form onSubmit={formSubmitHandler} className="form-edit-container">
            <div className="form-edit-group">
              <input
                type="text"
                placeholder="Enter product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-edit-group">
              <textarea
                className="edit-input-desc"
                placeholder="Enter the description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="form-edit-group">
              <input
                type="text"
                placeholder="Enter Categories"
                value={category}
                onChange={(e) => setCategories([e.target.value])}
              />
            </div>
            <div className="form-edit-group">
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => SetStock(e.target.value)}
              />
            </div>
            <div className="form-edit-group">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => SetPrice(e.target.value)}
              />
            </div>
            <div className="colors-and-size">
              <div className="cloroSize">
                <div className="form-edit-group cs ">
                  <input
                    type="text"
                    placeholder="Colors"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="form-edit-group cs">
                  <input
                    type="text"
                    placeholder="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
              </div>
              <div className="cs-btn" onClick={addHandler}>
                Add
              </div>
              <div className="colors">
                Colors :{" "}
                {dataColor.map((color) => (
                  <span
                    key={color}
                    style={{
                      backgroundColor: color === "white" ? "#ccc" : color,
                    }}
                  ></span>
                ))}
              </div>
              <div className="sizes">
                Size :{" "}
                {dataSize.map((size) => (
                  <span key={size}>| {size} </span>
                ))}
              </div>
            </div>

            <button type="submit" className="form-edit-btn">
              Add
            </button>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </section>
  );
};

export default AddProduct;
