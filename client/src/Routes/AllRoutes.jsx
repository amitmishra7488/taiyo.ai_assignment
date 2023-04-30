import React from "react";
import { Route, Routes, Switch } from "react-router-dom";
import MainContact from "../components/MainContact";
import Chart from "../components/Chart";



export default function AllRoutes() {
  return (

    <Routes>
      <Route path="/" element={<MainContact />} />
      <Route path="/contact" element={<MainContact />} />
      <Route path="/charts" element={<Chart />} />
      <Route path="*" element={<MainContact />} />
    </Routes>

  )
}
