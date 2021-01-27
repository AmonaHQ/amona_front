import React, { useState } from "react";
import Loader from "react-loader-spinner";
import Overlay from "./warning";
import { useRecoilState } from "recoil";
import { busyOverlayState } from "../../recoil/atoms";

const BusyOverlay = () => {
  const [isBusy] = useRecoilState(busyOverlayState);

  return (
    <div className={isBusy? "busy-overlay--show":"busy-overlay"}>
      <Loader
        type="ThreeDots"
        color="white"
        height={100}
        width={100}
        timeout={3000000} //3 secs
      />
    </div>
  );
};

export default BusyOverlay;
