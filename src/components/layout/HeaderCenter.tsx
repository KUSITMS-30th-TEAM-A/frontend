import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logoIcon from '../../assets/svg/hitzone_logo.svg';

const BackBar = () => {
    return (
        <div className="flex pb-[14px] border-b border-grayscale-10">
            <div className="flex justify-center w-full">
                <Link href="/">
                    <Image src={logoIcon} alt="Logo" width={154} height={27} />
                </Link>
            </div>
        </div>
    );
}

export default BackBar;