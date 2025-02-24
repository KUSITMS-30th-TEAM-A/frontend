import React, { useState, useEffect, useRef } from "react";

// 시간 순서대로 챗 컴포넌트를 출력하는 컴포넌트
const ChatWithComponents = () => {
    const [components, setComponents] = useState<any[]>([]); // 시간에 따라 띄울 컴포넌트들
    const chatContainerRef = useRef<any>(null); // 채팅 컨테이너 참조
    
    // 컴포넌트 추가하는 함수
    const addComponent = (component: JSX.Element) => {
      setComponents((prevComponents) => [...prevComponents, component]);
    };
    
    useEffect(() => {
      // 컴포넌트 추가 후 자동 스크롤
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [components]); // 컴포넌트가 추가될 때마다 실행
  
    return (
      <div
        ref={chatContainerRef}
      >
        {/* 시간 순으로 추가된 컴포넌트 렌더링 */}
        {components.map((component, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {component}
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatWithComponents;