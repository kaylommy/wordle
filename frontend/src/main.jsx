import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import WelcomePage from './pages/welcomePage.jsx';
import Login from './pages/loginPage.jsx';
import SignUp from './pages/signupPage.jsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
  
      children: [
        {
          index: true,
          element: <WelcomePage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <SignUp />
        },
        // {
        //  path: "",
        //  element: </>
        // }
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />
  );