import { atom } from "recoil";
import { useUserQuery } from "../operations/queries";
const loginState = atom({
  key: "loginState",
  default: false,
});

const menuState = atom({
  key: "menuState",
  default: {
    index: 0,
    title: "Personal Home",
    useQuery: useUserQuery,
  },
});
export { loginState, menuState };
