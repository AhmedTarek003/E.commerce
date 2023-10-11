import { useEffect } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import "./products.css";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="products-page">
      <ProductsList />
    </section>
  );
};

export default Products;
