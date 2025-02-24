import React from "react";

type Tab = "먹거리" | "즐길거리";

interface TabTextPinkProps {
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
}

export default function CultureTabs({ selectedTab, onSelectTab }: TabTextPinkProps) {
  const tabs: Tab[] = ["먹거리", "즐길거리"];

  return (
    <div className="flex justify-center border-b border-grayscale-20">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`flex-1 py-3 text-center text-sm font-semibold relative ${
            selectedTab === tab
              ? "text-main-50"
              : "text-grayscale-30"
          }`}
        >
          {tab}
          {selectedTab === tab && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-main-50"></span>
          )}
        </button>
      ))}
    </div>
  );
}
