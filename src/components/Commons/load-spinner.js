import React from "react";
import Loader from "react-loader-spinner";
import { useRecoilState } from "recoil";
import { spinLoaderState } from "../../recoil/atoms";

const BusyOverlay = () => {
  const [isBusy] = useRecoilState(spinLoaderState);

  return (
    <div
      className={
        isBusy
          ? "busy-overlay--show busy-overlay--show--load-spinner"
          : "busy-overlay"
      }
    >
      <Loader
        type="Oval"
        color="var(--color-danger)"
        height={80}
        width={80}
        timeout={300000000} //3 secs
        style={{ margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default BusyOverlay;
