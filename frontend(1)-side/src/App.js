//import Sidebar from './Component/Admin/SideBar/sidebar'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import TaskDetail from "./Component/Admin/AssignTask/taskDetail";
import Dashbord from "./Component/Admin/DashBoard/dashbord";
import EmpDetail from "./Component/Admin/Employee/empDetail";
import ManagerDetail from "./Component/Admin/Manager/managerDetail";
import LoginPg from "./Component/User/Login/loginPg";
import RegisterPg from "./Component/User/Register/registerPg";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPg/>}></Route>
      <Route path="/register" element={<RegisterPg/>}></Route>
      <Route path="/body" element={<Dashbord/>}></Route>
      <Route path="/emp-data" element={<EmpDetail/>}></Route>
      <Route path="/taskDetail" element={<TaskDetail/>}/>
      <Route path='/manager-data' element={<ManagerDetail/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;