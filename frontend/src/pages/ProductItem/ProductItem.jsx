import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import "./productItem.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteProduct,
  getProductById,
} from "../../redux/apiCalls/productsApiCall";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const ProductItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);
  const { delMsg } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (delMsg) {
      navigate("/");
    }
  }, [delMsg, navigate]);

  const deletHandler = () => {
    dispatch(DeleteProduct(id));
  };

  const [images, setImages] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle Quantity
  const quantityHanlder = (type) => {
    if (type === "Inc" && product.stock >= quantity) {
      setQuantity(quantity + 1);
    } else if (type === "Dec" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Handle Images swipper
  const handleImages = (index) => {
    setImages(index);
  };

  // Add To Cart
  const addToCart = (product) => {
    if (!user) return toast.error("please, login first");
    if (color.trim() === "") return toast.error("please, choose color first");
    if (size.trim() === "") return toast.error("please, choose size first");
    dispatch(cartActions.addToCart({ ...product, quantity, color, size }));
  };

  return (
    <section className="product-Item">
      <div className="productItem-Container">
        <div className="product-images">
          {product?.images?.length > 1 && (
            <div className="product-image-tumps">
              {product?.images?.map((image, index) => (
                <div
                  className="thumps-image"
                  key={index}
                  onClick={() => handleImages(index)}
                >
                  <img src={image?.url} alt="" className="thump-image" />
                </div>
              ))}
            </div>
          )}

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
        <div className="products-info">
          <div className="productItem-Price">$ {product?.price}</div>
          <div className="productItem-Title">
            Title : <span>{product?.title}</span>
          </div>
          <p className="productItem-Desc">{product?.desc}</p>
          <div className="productItem-attach">
            <div className="prodcutItem-Color">
              select color :{" "}
              <div className="color-Lists">
                {product?.color.map((colorItem, index) => (
                  <div
                    key={index}
                    className="list-color"
                    style={{
                      backgroundColor:
                        colorItem === "white" ? "#ccc" : colorItem,
                    }}
                    onClick={() => setColor(colorItem)}
                  ></div>
                ))}
                {color && (
                  <h5
                    style={{ color: color === "white" ? "black" : color }}
                    className="colorsItme-select"
                  >
                    {" "}
                    {color}
                  </h5>
                )}
              </div>
            </div>
            <div className="productItem-Size">
              select size :
              <select
                className="prodcut-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option disabled value="">
                  Select Size
                </option>
                {product?.size.map((size) => (
                  <option className="select-option" value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="productItem-quantity">
            <div
              className="quantityIC munis"
              onClick={() => quantityHanlder("Dec")}
            >
              -
            </div>
            <div className="quantityIC num">{quantity}</div>
            <div
              className="quantityIC plus"
              onClick={() => quantityHanlder("Inc")}
            >
              +
            </div>
          </div>
          {product?.stock - quantity < 0 ? (
            <h1 style={{ color: "red" }}>out of stock</h1>
          ) : (
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add To Cart
            </button>
          )}
        </div>
        {user?.isAdmin && (
          <div className="product-actions" onClick={deletHandler}>
            <Delete />
          </div>
        )}
      </div>
      {loading && <Loading />}
    </section>
  );
};

export default ProductItem;
