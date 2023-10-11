import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../redux/apiCalls/productsApiCall";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./category.css";

const Category = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductsByCategory(category));
  }, [dispatch, category]);

  return (
    <section className="products-page">
      {products.length <= 0 ? (
        <h1>No Products</h1>
      ) : (
        <div className="category-products">
          {products?.map((item) => (
            <ProductItem item={item} key={item?._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Category;
