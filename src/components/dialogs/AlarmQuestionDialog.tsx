
import Image from 'next/image';

import notificationMain50Icon from '../../assets/webp/notification_main50.webp';

const Dialog = () => {
    return (
        <div className="flex flex-col border rounded-[12px] w-[324px] h-[125px]">
            <div className="flex justify-center items-center mt-[22px] mb-[22px] gap-[5px]">
                <Image src={notificationMain50Icon} alt="뒤로가기 버튼" width={24} height={24} />
                <p className="text-sm text-grayscale-90 font-semibold">
                    Hitzone.com 에서 알람을 보내려고 합니다.
                </p>
            </div>
            <div className="flex justify-end items-center p-[20px]">
                <p className="text-sm text-grayscale-80 font-semibold mr-[33px]">
                    차단
                </p>
                <p className="text-sm text-grayscale-80 font-semibold">
                    허용
                </p>
            </div>
        </div>
    )
}


export default Dialog