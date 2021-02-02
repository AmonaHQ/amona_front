import React from "react";
import BarLoader from "react-bar-loader";
import { useRecoilState } from "recoil";
import { busyOverlayState } from "../../recoil/atoms";

const BusyOverlay = () => {
  const [isBusy] = useRecoilState(busyOverlayState);

  return (
    <div className={isBusy ? "busy-overlay--show" : "busy-overlay"}>
      <BarLoader color="#1D8BF1" height="2" />
    </div>
  );
};

export default BusyOverlay;
