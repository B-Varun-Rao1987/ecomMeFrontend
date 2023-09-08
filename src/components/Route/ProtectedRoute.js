// // import React, { Fragment } from "react";
// // import { useSelector } from "react-redux";
// // import { Navigate, Route } from "react-router-dom";

// // const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
// //   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

// //   return (
// //     <Fragment>
// //       {loading === false && (
// //         <Route
// //           {...rest}
// //           render={(props) => {
// //             if (isAuthenticated === false) {
// //               return <Navigate to="/login" />;
// //             }

// //             if (isAdmin === true && user.role !== "admin") {
// //               return <Navigate to="/login" />;
// //             }

// //             return <Component {...props} />;
// //           }}
// //         />
// //       )}
// //     </Fragment>
// //   );
// // };

// // export default ProtectedRoute;

// // ProtectedRoute.js
// // import React from "react";
// // import { useSelector } from "react-redux";
// // import { Navigate, Route } from "react-router-dom";

// // const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
// //   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

// //   if (loading) {
// //     return null; // You might want to display a loading spinner here
// //   }

// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" />;
// //   }

// //   if (isAdmin && user.role !== "admin") {
// //     return <Navigate to="/login" />;
// //   }

// //   return <Route {...rest} element={<Element />} />;
// // };

// // export default ProtectedRoute;




// --theek

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null; // You might want to display a loading spinner here
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  // return <Route {...rest} element={Element} />;
// return (
//   <Routes>
//     <Route {...rest} element={<Element />} />
//   </Routes>
// );
  return <Element /> 
};

export default ProtectedRoute;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   if (loading) {
//     return null; // You might want to display a loading spinner here
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (isAdmin && user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }

//   return <Route {...rest} element={<Component {...rest} />} />;
// };

// export default ProtectedRoute;


