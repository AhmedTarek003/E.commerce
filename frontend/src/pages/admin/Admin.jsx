import { useEffect } from "react";
import AdminAnaltyics from "../../components/Admin-Analtyics/AdminAnaltyics";
import Sidebar from "../../components/Admin-Sidebar/Sidebar";
import Chart from "../../components/Chart/Chart";
import LastTransAactions from "../../components/LastTransActions/LastTransAactions";
import NewUser from "../../components/NewUser/NewUser";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "../../redux/apiCalls/orderApiCall";

const Admin = () => {
  const dispatch = useDispatch();
  const { ordersStatusIncom } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);
  return (
    <section className="admin-page">
      <Sidebar />
      <div className="admin-Analysics">
        <AdminAnaltyics />
        <Chart data={ordersStatusIncom} />
        <div className="admin-users">
          <NewUser />
          <LastTransAactions />
        </div>
      </div>
    </section>
  );
};

export default Admin;
