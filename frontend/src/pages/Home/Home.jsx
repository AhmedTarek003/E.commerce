import "./home.css";
import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories/Categories";
import ProductsList from "../../components/ProductsList/ProductsList";

const Home = () => {
  return (
    <section>
      <Slider />
      <Categories />
      <ProductsList />
    </section>
  );
};

export default Home;
