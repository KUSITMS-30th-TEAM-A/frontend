import Image from "next/image";
import chatbotLoadingAnimation from "@/src/assets/gif/chatbot_loading_baseball_pink.gif";

const ChatbotClovaLoading = () => {
  return (
    <div className="flex-col fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin">
            <Image src={chatbotLoadingAnimation} alt="Loading" className="w-24 h-24" />
        </div>
        <p className="font-semibold text-grayscale-0">루키가 생각중이에요..</p>
    </div>
  );
};

export default ChatbotClovaLoading;
