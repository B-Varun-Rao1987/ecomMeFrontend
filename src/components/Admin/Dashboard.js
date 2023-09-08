// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar.js";
// import "./dashboard.css";
// import { Typography } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
// import MetaData from "../layout/MetaData";

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state) => state.products);

//   const { orders } = useSelector((state) => state.allOrders);

//   const { users } = useSelector((state) => state.allUsers);

//   let outOfStock = 0;

//   products &&
//     products.forEach((item) => {
//       if (item.Stock === 0) {
//         outOfStock += 1;
//       }
//     });

//   useEffect(() => {
//     dispatch(getAdminProduct());
//     dispatch(getAllOrders());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   let totalAmount = 0;
//   orders &&
//     orders.forEach((item) => {
//       totalAmount += item.totalPrice;
//     });

//   const lineState = {
//     labels: ["Initial Amount", "Amount Earned"],
//     datasets: [
//       {
//         label: "TOTAL AMOUNT",
//         backgroundColor: ["tomato"],
//         hoverBackgroundColor: ["rgb(197, 72, 49)"],
//         data: [0, totalAmount],
//       },
//     ],
//   };

//   const doughnutState = {
//     labels: ["Out of Stock", "InStock"],
//     datasets: [
//       {
//         backgroundColor: ["#00A6B4", "#6800B4"],
//         hoverBackgroundColor: ["#4B5000", "#35014F"],
//         data: [outOfStock, products.length - outOfStock],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <MetaData title="Dashboard - Admin Panel" />
//       <Sidebar />

//       <div className="dashboardContainer">
//         <Typography component="h1">Dashboard</Typography>

//         <div className="dashboardSummary">
//           <div>
//             <p>
//               Total Amount <br /> ₹{totalAmount}
//             </p>
//           </div>
//           <div className="dashboardSummaryBox2">
//             <Link to="/admin/products">
//               <p>Product</p>
//               <p>{products && products.length}</p>
//             </Link>
//             <Link to="/admin/orders">
//               <p>Orders</p>
//               <p>{orders && orders.length}</p>
//             </Link>
//             <Link to="/admin/users">
//               <p>Users</p>
//               <p>{users && users.length}</p>
//             </Link>
//           </div>
//         </div>

//         <div className="lineChart">
//           <Line data={lineState} />
//         </div>

//         <div className="doughnutChart">
//           <Doughnut data={doughnutState} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products && products.length - outOfStock],
      },
    ],
  };

  // State to force chart recreation
  const [lineChartKey, setLineChartKey] = useState(Date.now());

  // Refs for chart instances
  const doughnutChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Initialize Chart.js
    if (!window.Chart) return;
    window.Chart.platform.disableCSSInjection = true;

    // Destroy existing chart instances
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    // Create new chart instances
    doughnutChartRef.current = new window.Chart(doughnutChartRef.current, {
      type: "doughnut",
      data: doughnutState,
    });

    lineChartRef.current = new window.Chart(lineChartRef.current, {
      type: "line",
      data: lineState,
    });

    // Force chart update by changing the key
    setLineChartKey(Date.now());
  }, [doughnutState, lineState]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart" key={lineChartKey}>
          <canvas ref={lineChartRef} />
        </div>

        <div className="doughnutChart">
          <canvas ref={doughnutChartRef} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;






