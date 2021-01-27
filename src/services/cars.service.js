import React, { useState } from "react";
import Axios from "axios";
import { useRecoilState } from "recoil";
import {
  vehicleMakeState,
  busyOverlayState,
  vehicleModelState,
} from "../recoil/atoms";

const refineVehicleMakeResult = (rawData, selector) => {
  const refinedResult = [];
  for (let index = 0; index < rawData.length; index += 1) {
    const rawResult = rawData[index];
    const isExists = refinedResult.filter(
      (refinedResult) => refinedResult.Make_ID === rawResult.Make_ID
    );
    if (!isExists.length) {
      refinedResult.push(rawResult);
    }
  }

  return refinedResult;
};
const useGetVehicleMake = () => {
  const [vehicleMakes, setVehicleMakes] = useRecoilState(vehicleMakeState);
  const [error, setError] = useState();
  const [, setIsBusy] = useRecoilState(busyOverlayState);

  const getVehicleMake = async (keyword, delay = 1000) => {
    if (keyword.length >= 2) {
      try {
        setIsBusy(true);
        const vehicleMakes = await Axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`
        );
        if (vehicleMakes.data.Results) {
          setIsBusy(false);
          setVehicleMakes(vehicleMakes.data.Results, keyword);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return [getVehicleMake, vehicleMakes, error];
};

const useGetVehicleModel = () => {
  const [error, setError] = useState();
  const [vehicleModel, setVehicleModel] = useRecoilState(vehicleModelState);

  const [, setIsBusy] = useRecoilState(busyOverlayState);

  const getVehicleModel = async (Make_Id) => {
    try {
      setIsBusy(true);
      const vehicleModels = await Axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${Make_Id}?format=json`
      );
      if (vehicleModels.data && vehicleModels.data.Results) {
        console.log("models", vehicleModels.data.Results);
        setIsBusy(false);
        // setVehicleModel(vehicleModel.data.Results);
        return vehicleModels.data.Results;
      }
    } catch (error) {
      setError(error.message);
      setIsBusy(false);
      return error.message;
    }
  };

  return [getVehicleModel];
};
export { useGetVehicleMake, useGetVehicleModel };
