import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatetProduct } from "../../redux/apiCalls/productsApiCall";

const ProductForm = ({ id, product }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(product?.title);
  const [desc, setDesc] = useState(product?.desc || "");
  const [category, setCategories] = useState(product?.categories || []);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, SetPrice] = useState(product?.price || 0);
  const [stock, SetStock] = useState(product?.stock || 0);
  const [dataColor, setDataColor] = useState(product?.color || []);
  const [dataSize, setDataSize] = useState(product?.size || []);

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

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const categories = category.join(",").split(",");
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

    dispatch(
      updatetProduct(id, {
        title,
        desc,
        categories,
        size: dataSize,
        color: dataColor,
        price,
        stock,
      })
    );
  };

  return (
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
          {dataColor?.map((color) => (
            <span
              key={color}
              style={{ backgroundColor: color === "white" ? "#ccc" : color }}
            ></span>
          ))}
        </div>
        <div className="sizes">
          Size :{" "}
          {dataSize?.map((size) => (
            <span key={size}>| {size} </span>
          ))}
        </div>
      </div>
      <button type="submit" className="form-edit-btn">
        Edit
      </button>
    </form>
  );
};

export default ProductForm;
