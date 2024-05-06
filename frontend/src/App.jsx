import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ChatPage from "@/containers/ChatPage";
import Home from "@/containers/Home";
import Layout from "@/containers/Layout";
import Reports from "@/containers/Reports";
import ReportUpload from "@/containers/ReportUpload";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="upload" element={<ReportUpload />} />
        <Route path="reports/:reportId?" element={<Reports />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
