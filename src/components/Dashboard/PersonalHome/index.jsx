import React from "react";
import { useUserQuery, useLogin as login } from "../../../operations/queries";
import Loaded from "./loaded";
import Skeleton from "./skeleton";

const PersonalHome = () => {
  const { data, loading } = useUserQuery();

  return <>{loading ? <Skeleton /> : <Loaded data={data.getUser} />}</>;
};

export default PersonalHome;
