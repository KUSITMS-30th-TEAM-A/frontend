import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import serviceReadyImage from "../../assets/webp/service_ready.webp";

const ServiceReady = () => {
  const router = useRouter();
  const SURVEY_URL = "https://forms.gle/qnPQnwfMYiDWrCW86"; // 설문조사 URL

  const handleButtonClick = () => {
    router.push(SURVEY_URL);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
        <Image
          src={serviceReadyImage}
          alt="서비스 준비 이미지"
          width={338}
          height={192}
          objectFit="contain"
        />
      <p className="text-lg font-semibold mb-3 text-grayscale-90">서비스 준비 중이에요!
      </p>
      <button
        onClick={handleButtonClick}
        className="px-2 py-[6px] bg-grayscale-5 text-xs font-medium rounded-lg focus:outline-none"
      >
        + 서비스 제안하기
      </button>
    </div>
  );
};

export default ServiceReady;
