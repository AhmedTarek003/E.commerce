import { useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./productsList.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/apiCalls/productsApiCall";
import Loading from "../Loading/Loading";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="productsList">
      {products.length > 0 ? (
        products.map((item) => <ProductItem item={item} key={item._id} />)
      ) : (
        <h1>No products</h1>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default ProductsList;
