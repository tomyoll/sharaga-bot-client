import { AppBar, Button, Toolbar, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import api from "../../api";
import logo from "../../assets/logo.png";
import { adminSelector } from "../../store/RecoilState";

const MainLayout = () => {
  const [admin, setAdmin] = useRecoilState(adminSelector);

 

  useEffect( () => {
    async function fetchAdmin() {
      const response = await api.get({ path: "/admin/profile" });
  
      return setAdmin(response.admin);
    }
    fetchAdmin()
  }, []);

  const navigate = useNavigate();

  async function sendSignOutRequest() {
    await api.get({ path: '/admin/signOut' });
    localStorage.removeItem('token');
    navigate('/auth')
  }

  return (
    <AppBar sx={{ backgroundColor: "rgb(29, 81, 131)" }}>
      <Toolbar>
        {console.log(admin)}
        { admin?.role === 1
        ? (
          <Button
          variant="contained"
          >
            signUp new admin
          </Button>
        )
        : null
       }
        { localStorage.getItem('token') 
        ? (<Button
        variant="contained"
        onClick={sendSignOutRequest}
        >
          signOut
        </Button>)
        : null
       }
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
      </Toolbar>
    </AppBar>
  );
};

export default MainLayout;
