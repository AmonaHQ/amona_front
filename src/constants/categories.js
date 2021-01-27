import cars from "../assets/img/cars/cars.png";
import trucks from "../assets/img/cars/trucks.png";
import trailers from "../assets/img/cars/trailers.png";
import rvs from "../assets/img/cars/rvs.png";
import boats from "../assets/img/cars/boats.png";
import bikes from "../assets/img/cars/bikes.png";
import snowmobiles from "../assets/img/cars/trucks.png";
import heavyequipments from "../assets/img/cars/heavyequipments.png";
import farm from "../assets/img/cars/farm.png";
import rentals from "../assets/img/cars/rentals.png";
import parts from "../assets/img/cars/parts.png";
import services from "../assets/img/cars/services.png";

import car from "../svgs/car.svg";
import truck from "../svgs/truck.svg";
import suv from "../svgs/suv.svg";
import heavyTruck from "../svgs/heavy-truck.svg";
import trailer from "../svgs/trailer.svg";
import rv from "../svgs/rv.svg";
import ship from "../svgs/ship.svg";
import motorbike from "../svgs/motorbike.svg";
import snowmobile from "../svgs/snowmobile.svg";
import heavyEquipment from "../svgs/heavy-equipment.svg";
import tractor from "../svgs/tractor.svg";
import carRental from "../svgs/car-rental.svg";
import sparePart from "../svgs/spare-part.svg";
import carService from "../svgs/car-service.svg";












const categories = [
  { title: "Cars, Trucks & SUVs", picture: cars },
  { title: "Commercial / Heavy Trucks", picture: trucks },
  { title: "Trailers", picture: trailers },
  { title: "RVs", picture: rvs },
  { title: "Boats & Watercraft", picture: boats },
  { title: "Bikes & ATVs", picture: bikes },
  { title: "Snowmobiles", picture: snowmobiles },
  { title: "Heavy Equipment", picture: heavyequipments },
  { title: "Farm", picture: farm },
  { title: "Car Rentals", picture: rentals },
  { title: "Spare Parts", picture: parts },
  { title: "Other Auto Services", picture: services },
];

const categoriesWithIcons = [
  { title: "Cars", picture: cars, icon: car },
  { title: "Trucks", picture: cars, icon: truck },
  { title: "SUVs", picture: cars, icon: suv },
  { title: "Commercial / Heavy Trucks", icon: heavyTruck },
  { title: "Trailers", icon: trailer },
  { title: "RVs", icon: rv },
  { title: "Boats & Watercraft", icon: ship },
  { title: "Bikes & ATVs", icon: motorbike },
  { title: "Snowmobiles", icon: snowmobile },
  { title: "Heavy Equipment", icon: heavyEquipment },
  { title: "Farm", icon: tractor },
  { title: "Car Rentals", icon: carRental },
  { title: "Spare Parts", icon: sparePart },
  { title: "Other Auto Services", icon: carService },
];

export { categoriesWithIcons, categories as default };
