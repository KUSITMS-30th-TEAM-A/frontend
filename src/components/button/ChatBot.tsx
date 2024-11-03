import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import chatbotIcon from "../../assets/svg/chatbot_button.svg";

const FloatingChatbotButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Chatbot/Chatbot");
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-4 right-4 flex items-center justify-center transition duration-300 ease-in-out"
    >
      <Image src={chatbotIcon} alt="히트존 챗봇" width={48} height={48} />
    </button>
  );
};

export default FloatingChatbotButton;