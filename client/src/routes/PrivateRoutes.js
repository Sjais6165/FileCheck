//


//----------------------------


// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/authcontext";

// const PrivateRoutes = () => {
//     const { user } = useAuth(); // Ensure this is correctly imported

//     return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoutes;


//-------------

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const PrivateRoutes = () => {
    const { token } = useAuth(); // ✅ Use token instead of user

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
