import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/AppLayout";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import { useState } from "react";
import Posts from "./pages/Posts";
import { User } from "./api/auth";

function App() {
  const userFromLocal: User = JSON.parse(
    localStorage.getItem("user") || "{}"
  ) || {
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
  };
  const [user, setUser] = useState<User>(userFromLocal);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout user={user} setUser={setUser} />,
      children: [
        {
          path: "login",
          element: <Login setUser={setUser} />,
        },
        {
          path: "register",
          element: <Register setUser={setUser} />,
        },
        {
          path: "myaccount",
          element: <MyAccount user={user} setUser={setUser} />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "red",
              color: "white",
            },
          },
          style: {
            fontFamily: "Arial",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            color: "white",
          },
        }}
      />
    </>
  );
}

export default App;
