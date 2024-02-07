import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Deliveries from "./pages/Deliveries";
import Delivery from "./pages/Delivery";

const CustomRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Deliveries />} />
        <Route path="/:id" element={<Delivery />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
