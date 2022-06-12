import { useEffect } from "react";
import { useRecoilState } from "recoil";
import api from "./api";
import AppRouter from "./routes";
import { adminSelector } from "./store/RecoilState";

function App() {
  return <AppRouter />;
}

export default App;
