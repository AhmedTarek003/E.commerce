import { Link } from "react-router-dom";
import { categories } from "../../data";
import "./categories.css";

const Categories = () => {
  return (
    <div className="categories">
      <div className="coategory-container">
        {categories.map((cate) => (
          <div className="category-box" key={cate.id}>
            <div className="category-image">
              <img src={cate.img} alt="" />
            </div>
            <div className="category-box-overlay">
              <div className="category-box-title">{cate.title}</div>
              <Link
                to={`/category/${cate.cat}`}
                className="category-box-button"
              >
                Show Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
