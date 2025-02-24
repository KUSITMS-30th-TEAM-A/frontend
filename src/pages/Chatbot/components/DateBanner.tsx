import { getFormattedDate1 } from "@/src/hooks/useDate";

interface Props {
    date: Date;
}

// 채팅창 상단에 뜨는 날짜 헤더 바
const DateBanner = ({date}: Props) => {

    return (
        <div className="flex justify-center mb-6">
            <span className="bg-grayscale-5 px-6 py-[3px] text-grayscale-90 text-xs font-regular rounded-full">
                {getFormattedDate1(date)}
            </span>
        </div>
    );
};

export default DateBanner;