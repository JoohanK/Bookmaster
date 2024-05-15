"use client";

import "../scss/main.scss";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/state/store";
import Header from "./components/header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </Provider>
  );
}
