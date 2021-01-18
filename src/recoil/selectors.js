import { selector } from "recoil";
import { loginState, menuState } from "./atoms";

const currentLoginState = selector({
  key: "currentLoginState",
  get: ({ get }) => {
    return get(loginState);
  },
});

const currentMenuState = selector({
  key: "currentMenuState",
  get: ({ get }) => get(menuState),
});
export { currentLoginState, currentMenuState };
