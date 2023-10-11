import { useEffect } from "react";
// import { Products } from "../../data";
import ProductItem from "../ProductItem/ProductItem";
import "./productsList.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/apiCalls/productsApiCall";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="productsList">
      {products.map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}
    </div>
  );
};

export default ProductsList;
