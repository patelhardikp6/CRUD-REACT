import './App.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import User from './Components/getuser/User.jsx';
import Add from './Components/adduser/Add.jsx';
import Edit from "./Components/updateuser/Edit.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User/>,
    },
    {
      path:"/add",
      element:<Add/>,
    },
    {
      path:"/edit/:id",
      element:<Edit/>,
    },
  ])
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
