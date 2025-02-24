import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logoIcon from '../../assets/svg/hitzone_logo.svg';
import backLeftButtonGrayIcon from '../../assets/webp/back_left_button_gray.webp';

const BackBar = () => {
    const router = useRouter();

    return (
        <div className="fixed top-0 max-w-[500px] justify-center w-full flex items-center py-[14px] px-4 bg-white z-20">
            <div className="absolute left-2 flex items-center">
                <Image
                    src={backLeftButtonGrayIcon}
                    alt="뒤로가기 버튼"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => router.back()}
                />
            </div>
            <div className="">
                <Link href="/">
                    <Image src={logoIcon} alt="Logo" width={154} height={27} className="cursor-pointer"/>
                </Link>
            </div>
        </div>
    );
};

export default BackBar;
