import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import homeGrayIcon from "../../assets/webp/home_gray.webp";
import homePinkIcon from "../../assets/webp/home_pink.webp";
import guideGrayIcon from "../../assets/webp/guide_gray.webp";
import guidePinkIcon from "../../assets/webp/guide_pink.webp";
import cultureGrayIcon from "../../assets/webp/culture_gray.webp";
import culturePinkIcon from "../../assets/webp/culture_pink.webp";
import mypageGrayIcon from "../../assets/webp/mypage_gray.webp";
import mypagePinkIcon from "../../assets/webp/mypage_pink.webp";

const NavBar = () => {
  const router = useRouter();

  // 메뉴 아이템 목록과 각 아이콘
  const menuItems = [
    { name: "홈", path: "/", icon: homeGrayIcon, activeIcon: homePinkIcon },
    { name: "구역 가이드", path: "/guide", icon: guideGrayIcon, activeIcon: guidePinkIcon },
    { name: "야구 문화", path: "/culture", icon: cultureGrayIcon, activeIcon: culturePinkIcon },
    { name: "마이 페이지", path: "/mypage", icon: mypageGrayIcon, activeIcon: mypagePinkIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-[500px] mx-auto bg-grayscale-0 border-t border-grayscale-10 flex justify-between px-6 py-3" aria-label="Main Navigation">
      {menuItems.map((item) => {
        // 홈 경로와 나머지 경로 구분
        const isActive = item.path === "/"
          ? router.asPath.split('?')[0] === "/"
          : router.asPath.startsWith(item.path);

        return (
          <div
            key={item.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              router.push(item.path);
            }}
          >
            <Image
              src={isActive ? item.activeIcon : item.icon}
              alt={`${item.name} Icon`}
              width={54} 
              height={45}
              priority={item.path === "/"}
            />
          </div>
        );
      })}
    </nav>
  );
};

export default NavBar;
