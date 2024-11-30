import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import backLeftButtonGrayIcon from '../../assets/webp/back_left_button_gray.webp';

const BackBar = () => {
    const router = useRouter();

    return (
        <div className="px-[15px] z-20">
            <Image
                src={backLeftButtonGrayIcon}
                alt="뒤로가기 버튼"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => router.back()}
            />
        </div>
    )
}


export default BackBar