import { useEffect } from "react";
import { useRecoilState } from "recoil";
import api from "./api";
import AppRouter from "./routes";
import { userSelector } from "./store/RecoilState";

function App() {
  // const [, setUser] = useRecoilState(userSelector);

  // async function fetchUser() {
  //   if (localStorage.getItem("token")) {
  //     try {
  //       const userProfile = await api.get({ path: "/user/profile" });
  //       setUser(userProfile);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return <AppRouter />;
}

export default App;
