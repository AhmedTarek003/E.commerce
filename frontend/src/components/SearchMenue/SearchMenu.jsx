import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySearch } from "../../redux/apiCalls/productsApiCall";
import "./searchMenu.css";
import { Link } from "react-router-dom";

const SearchMenu = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const { searchProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductBySearch(search));
  }, [dispatch, search]);
  return (
    <div className="search-products-items" id="searchHere">
      {search.trim() !== "" &&
        searchProduct?.map((product) => (
          <Link
            to={`/productItem/${product?._id}`}
            className="searchProductsItems"
            key={product?._id}
            onClick={() => setSearch("")}
          >
            <img
              className="search-prodcut-image"
              src={product?.images[0]?.url}
              alt=""
            />
            <div className="pragraph-product">
              <div className="search-product-title">{product?.title}</div>
              <div className="search-product-desc">
                {product?.desc.slice(0, 15)}......
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchMenu;
