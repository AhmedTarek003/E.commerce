import { CallMade, Edit, ProductionQuantityLimits } from "@mui/icons-material";
import "./productitem.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductItem = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="product-item">
      <div className="product-item-image">
        <img src={item?.images[0].url} alt="" />
      </div>
      <div className="product-item-overlay">
        <div className="product-item-icons">
          <Link to={`/productsList`}>
            <ProductionQuantityLimits className="productItemIcon" />
          </Link>
          <Link to={`/productItem/${item?._id}`}>
            <CallMade className="productItemIcon" />
          </Link>
          {user?.isAdmin && (
            <Link to={`/productItem-edit/${item?._id}`}>
              <Edit className="productItemIcon" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
