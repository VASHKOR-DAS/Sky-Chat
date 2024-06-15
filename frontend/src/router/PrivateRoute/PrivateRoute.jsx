import { ChatState } from "../../Context/ChatProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = ChatState();

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
