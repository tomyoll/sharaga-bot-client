import { atom, selector } from "recoil";

export const isLogin = atom({
  key: "isLogin",
  default: false
});

export const user = atom({
  key: "user",
  default: {}
});

export const accessToken = atom({
  key: "accessToken",
  default: localStorage.getItem("token")
});

export const accessTokenSelector = selector({
  key: "accessTokenSelector",
  get: ({ get }) => get(accessToken),
  set: ({ set }, newValue) => {
    localStorage.setItem("token", newValue);
    set(accessToken, newValue);
  }
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => get(user),
  set: ({ set }, newValue) => {
    set(user, newValue);
  }
});

export const changeLoginText = selector({
  key: "loginButtonText",
  get: ({ get }) => {
    const token = get(accessToken);
    return `${token ? "Logout" : "Login"}`;
  }
});
