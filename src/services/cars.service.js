import Axios from "axios";
import { useRecoilState } from "recoil";
import { busyOverlayState } from "../recoil/atoms";

// const refineVehicleMakeResult = (rawData, selector) => {
//   const refinedResult = [];
//   for (let index = 0; index < rawData.length; index += 1) {
//     const rawResult = rawData[index];
//     const isExists = refinedResult.filter(
//       (refinedResult) => refinedResult.Make_ID === rawResult.Make_ID
//     );
//     if (!isExists.length) {
//       refinedResult.push(rawResult);
//     }
//   }

//   return refinedResult;
// };
const useGetVehicleMake = () => {
  const getVehicleMake = async (keyword) => {
    if (keyword.length >= 2) {
      try {
        const vehicleMakes = await Axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/${keyword}?format=json`
        );
        if (vehicleMakes.data.Results) {
          return vehicleMakes.data.Results;
        }
      } catch (error) {
        return error.message;
      }
    }
  };

  return [getVehicleMake];
};

const useGetVehicleModel = () => {
  const [, setIsBusy] = useRecoilState(busyOverlayState);

  const getVehicleModel = async (Make_Id) => {
    setIsBusy(true);
    try {
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
      setIsBusy(false);
      return error.message;
    }
  };

  return [getVehicleModel];
};

const useGetVehicleModelByMake = () => {
  const [, setIsBusy] = useRecoilState(busyOverlayState);

  const getVehicleModel = async (make) => {
    setIsBusy(true);
    try {
      const vehicleModels = await Axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`
      );
      if (vehicleModels.data && vehicleModels.data.Results) {
        console.log("models by make", vehicleModels.data.Results);
        setIsBusy(false);
        return vehicleModels.data.Results;
      }
    } catch (error) {
      setIsBusy(false);
      return error.message;
    }
  };

  return [getVehicleModel];
};
export { useGetVehicleMake, useGetVehicleModel,useGetVehicleModelByMake };
