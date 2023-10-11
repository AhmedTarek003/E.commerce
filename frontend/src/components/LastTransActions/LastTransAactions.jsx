import { useDispatch, useSelector } from "react-redux";
import "./lastTarnsActions.css";
import { getAllOrders } from "../../redux/apiCalls/orderApiCall";
import { useEffect } from "react";
import Moment from "react-moment";

const LastTransAactions = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div className="last-transactions">
      <h1 className="last-transActions-Title">Last Transactions</h1>
      <ul className="lastTrans-lists mani-lists">
        <li className="lastTrans-list">customer</li>
        <li className="lastTrans-list">date</li>
        <li className="lastTrans-list">amount</li>
        <li className="lastTrans-list">state</li>
      </ul>
      {orders?.slice(0, 3).map((order) => (
        <ul className="lastTrans-lists" key={order?._id}>
          <li className="lastTrans-list">
            <div className="last-user" style={{ margin: 0 }}>
              <div className="last-user-Image">
                {order?.user[0]?.name.trim().slice(0, 1)}
              </div>
              <div className="last-user-username">{order?.user[0]?.name}</div>
            </div>
          </li>
          <li className="lastTrans-list">
            <Moment fromNow ago>
              {order?.createdAt}
            </Moment>
          </li>
          <li className="lastTrans-list">$ {order?.totalPrice}</li>
          <li className="lastTrans-list">
            <button
              className="trans-btn"
              style={{ backgroundColor: "#6573ea63", color: "#737FE9" }}
            >
              {order?.status}
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default LastTransAactions;
