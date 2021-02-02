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
const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

const userDetailsState = atom({
  key: "userDetailsState",
  default: {},
});

const imageUploadState = atom({
  key: "imageUploadState",
  default: false,
});
const imageUploadType = atom({
  key: "imageUploadType",
  default: "uploadImage",
});

const showWarningState = atom({
  key: "showWarningState",
  default: false,
});
const deleteProfileImageState = atom({
  key: "deleteProfileImageState",
  default: false,
});

const planState = atom({
  key: "planState",
  default: null,
});

const redirectionState = atom({
  key: "redirectionState",
  default: null,
});
const vehicleMakeState = atom({
  key: "vehicleMakeState",
  default: [],
});

const vehicleModelState = atom({
  key: "vehicleModelState",
  default: [],
});
const busyOverlayState = atom({
  key: "busyOverlayState",
  default: false,
});

const detailsState = atom({
  key: "detailsState",
  default: {},
});

const adDetailsProgressState = atom({
  key: "adDetailsProgressState",
  default: 0,
});

export {
  loginState,
  menuState,
  loginModalState,
  userDetailsState,
  imageUploadState,
  imageUploadType,
  showWarningState,
  deleteProfileImageState,
  planState,
  redirectionState,
  vehicleMakeState,
  busyOverlayState,
  vehicleModelState,
  detailsState,
  adDetailsProgressState,
};
