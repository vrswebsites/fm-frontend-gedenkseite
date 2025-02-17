import { defineStore } from "pinia";

export const useUserTypeStore = defineStore("user", {
  state: () => ({
    userType: localStorage.getItem("userType") || "normal",
  }),
  actions: {
    setUserType(type) {
      this.userType = type;
      localStorage.setItem("userType", type);
    },
  },
});
