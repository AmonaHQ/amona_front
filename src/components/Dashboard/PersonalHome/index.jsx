import React, { useState } from "react";
import { useUserQuery } from "../../../operations/queries";
import Loaded from "./loaded";
import Skeleton from "./skeleton";
const PersonalHome = () => {
  const { data, loading } = useUserQuery();
  console.log("user", data);
  return <>{loading ? <Skeleton /> : <Loaded data={data.getUser} />}</>;
};

export default PersonalHome;
