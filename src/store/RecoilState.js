import { atom, selector } from "recoil";

const admin = atom({
  key: "admin",
  default: {},
});

export const adminSelector = selector({
  key: "adminSelector",
  get: ({ get }) => get(admin),
  set: ({ set }, newValue) => set(admin, newValue),
});
