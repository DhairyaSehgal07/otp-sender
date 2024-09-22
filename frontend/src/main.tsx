import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.tsx";
import AddUserScreen from "./screens/AddUserScreen.tsx";
import UserScreen from "./screens/UserScreen.tsx";
import MessageScreen from "./screens/MessageScreen.tsx";
import ComposeNewMessageScreen from "./screens/ComposeNewMessageScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route index={true} path="/add-user" element={<AddUserScreen />} />
      <Route path="/user/:id" element={<UserScreen />} />
      <Route path="/messages" element={<MessageScreen />} />
      <Route path="/new-message/:id" element={<ComposeNewMessageScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
