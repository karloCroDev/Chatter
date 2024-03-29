import React from "react";
import ReactDOM from "react-dom/client";
import { Navigation } from "./Navigation.jsx";
import { FirebaseManagment } from "./components/Exports.jsx";
import { BrowserRouter } from "react-router-dom";
import Image from "./components/ImageUpload.jsx";
import GlobalCss from "./styles/global.css";
import toast, { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Image>
        <FirebaseManagment>
          <Navigation />
          <Toaster />
        </FirebaseManagment>
      </Image>
    </React.StrictMode>
  </BrowserRouter>
);
