import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import chatbotIcon from "@/src/assets/webp/chatbot_floating_button.webp";

const FloatingChatbotButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/chatbot"); 
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-[78px] right-4 md:right-[calc(50%-250px)] flex items-center justify-center transition ease-in-out rounded-full w-24 h-24 "
      aria-label="히트존 챗봇"
    >
      <Image 
        src={chatbotIcon} 
        alt="히트존 챗봇" 
        width={100} 
        height={100}
      />
    </button>
  );
};

export default FloatingChatbotButton;
