import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import "@chinese-fonts/yozai/dist/Yozai-Medium/result.css";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./redux/user.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Provider store={configureStore(
            {
                reducer: {
                    user: userSlice.reducer,
                },
                middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
            },
      )}>
        <App />
      </Provider>
  </React.StrictMode>,
);
