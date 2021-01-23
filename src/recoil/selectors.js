import { selector } from "recoil";
import {
  loginState,
  menuState,
  loginModalState,
  userDetailsState,
  imageUploadType,
} from "./atoms";

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

const currentLoginModalState = selector({
  key: "currentModalState",
  get: ({ get }) => get(loginModalState),
});

const currentUserDetails = selector({
  key: "currentUserDetails",
  get: ({ get }) => get(userDetailsState),
});

const currentImageUploadType = selector({
  key: "currentUserDetails",
  get: ({ get }) => get(imageUploadType),
});

export {
  currentLoginState,
  currentMenuState,
  currentLoginModalState,
  currentUserDetails,
  currentImageUploadType
};
