import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logoIcon from '../../assets/svg/hitzone_logo.svg';

const BackBar = () => {
    return (
        <div className="flex p-4 border-b border-grayscale-10 z-20">
            <div className="flex justify-center w-full">
                <Link href="/">
                    <Image src={logoIcon} alt="Logo" width={154} height={27} className="cursor-pointer" />
                </Link>
            </div>
        </div>
    );
}

export default BackBar;
