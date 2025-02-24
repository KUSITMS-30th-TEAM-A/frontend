import { useState, useEffect } from "react";
import { StadiumType } from "@/src/constants/ZoneData";
import { ZoneGetParamsType, ZoneGetResponseType } from "@/src/api/StadiumApiType";  // 타입들 import
import { handleGetStadiumInfo } from "@/src/api/StadiumApiHandler"; // API 호출 함수

import { useStadiumContext } from "@/src/context/StadiumContext";

export const useStadiumSelector = () => {
  
};
