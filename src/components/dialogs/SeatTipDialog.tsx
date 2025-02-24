
import React from "react";
import Image from 'next/image';

import recommendTipGrayIcon from '../../assets/webp/recommend_tip_gray.webp';
import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';

import { GuideDetail } from "@/src/api/StadiumApiType";

interface DialogProps extends GuideDetail {
    onClose: () => void;
}

const Dialog = ({zoneName, zoneColor, tip, referencesGroup, onClose }: DialogProps) => {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full">
            <div className="bg-white border border-0 rounded-[12px] w-[324px] p-[20px]">
                {/** 헤더 */}
                <div className="flex justify-between w-full ">
                    <div className="flex justify-start items-center w-full">
                        <Image src={recommendTipGrayIcon} alt="그레이 팁 버튼" className="w-[24px] h-[24px]" />
                        <p className="text-lg text-grayscale-90 font-bold ml-1">
                            TIP
                        </p>
                    </div>
                    <Image src={closeButtonGrayIcon} alt="닫기 버튼" className="w-[24px] h-[24px] cursor-pointer" onClick={onClose}/>

                </div>

                {/** 좌석 */}
                <div className="flex flex-col justify-start mt-[20px]">
                    <p className="text-lg text-jamsil-red font-bold" style={{ color: zoneColor }}>
                        {zoneName}
                    </p>

                    <p className="text-sm text-grayscale-80 font-medium">
                        {tip}
                    </p>

                    {/** 구분선 */}
                    <div className="flex justify-between w-full border-b border-grayscale-10 mt-[12px] mb-[12px]"/>
                    
                    <p className="mb-[8px] text-lg text-jamsil-red font-bold">
                        ❗️참고하세요❗️
                    </p>
                </div>

                <div className="">
                    {/** 회색 상자 */}
                    <div className="pb-[12px] bg-grayscale-5 border border-0 rounded-[8px] w-full">
                        {referencesGroup ? (
                            <>
                                {referencesGroup.references.map((reference, referenceIndex) => (
                                    <div key={referenceIndex} className="px-[12px] pt-[12px]">
                                        <p className="text-sm text-grayscale-90 font-bold">
                                            • {reference.title}
                                        </p>
                                        <p className="text-sm text-grayscale-90 font-regular ">
                                            {reference.contents.map((content, contentIndex) => (
                                                <span key={contentIndex}>
                                                {content}
                                                <br />
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                ))}
                            </>
                        ): null }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dialog