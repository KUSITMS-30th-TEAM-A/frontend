import React from "react";

import UserMessageWithTail from "@/src/pages/Chatbot/components/message/UserMessageWithTail";

interface Props {
    messageList: string[];
}

// 사용자 채팅 한 세트를 그룹화한 컴포넌트
const UserChat = ({messageList}: Props) => {

    return (
        <div className="flex justify-end">
            <UserMessageWithTail messageList={messageList} />
        </div>
    );
};

export default UserChat;
