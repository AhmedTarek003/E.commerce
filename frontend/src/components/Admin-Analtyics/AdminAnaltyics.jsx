import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import "./adminAnaltyics.css";

const AdminAnaltyics = () => {
  return (
    <div className="admin-dashboard-analtyics">
      <div className="admin-rating">
        <div className="admin-box-rating">
          <div className="admin-box-title">Ravenue</div>
          <div className="admin-box-price">
            <span className="admin-box-money">$ 1200</span>
            <div className="box-rate">
              <AiOutlineArrowUp />
              <div className="rate-precent">+30%</div>
            </div>
          </div>
        </div>
        <div className="admin-box-rating">
          <div className="admin-box-title">Sales</div>
          <div className="admin-box-price">
            <span className="admin-box-money">$ 200</span>
            <div className="box-rate">
              <AiOutlineArrowDown />
              <div className="rate-precent">-20%</div>
            </div>
          </div>
        </div>
        <div className="admin-box-rating">
          <div className="admin-box-title">Coast</div>
          <div className="admin-box-price">
            <span className="admin-box-money">$ 1200</span>
            <div className="box-rate">
              <AiOutlineArrowUp />
              <div className="rate-precent">+30%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnaltyics;
