import { AppBar, Button, Toolbar, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import api from "../../api";
import logo from "../../assets/logo.png";
import { adminSelector } from "../../store/RecoilState";

const MainLayout = () => {
  const [admin, setAdmin] = useRecoilState(adminSelector);

  const navigate = useNavigate();

  async function sendSignOutRequest() {
    const response = await api.get({ path: '/admin/signOut' });
    localStorage.removeItem('token');
    navigate('/auth')
  }

  useEffect( () => {
    async function fetchAdmin() {
      localStorage.setItem('isRetry', false)
      const response = await api.get({ path: "/admin/profile" });
      localStorage.setItem('isRetry', true)
  
      return setAdmin(response.admin);
    }
    localStorage.getItem ('isRetry') ? fetchAdmin() : null;
  }, []);

  return (
    <AppBar sx={{ backgroundColor: "rgb(29, 81, 131)" }}>
      <Toolbar>
        { admin?.role === 1 && localStorage.getItem('token')
        ? (
          <Button
          variant="contained"
          >
            signUp new admin
          </Button>
        )
        : null
       }
        {  
       localStorage.getItem('token') ?  (
        <><Button
        variant="contained"
        onClick={sendSignOutRequest}
        >
          signOut
        </Button>
           <Button
           variant="contained"
           onClick={() => navigate("/users")}>
           Users
         </Button>
         <Button
           variant="contained"
           onClick={() => navigate("/content")}>
           Content
         </Button>
         </>
        )
        : null
       }
      </Toolbar>
    </AppBar>
  );
};

export default MainLayout;
