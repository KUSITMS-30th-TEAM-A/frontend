import Image from 'next/image';
import Logo from '../../assets/header.png';
import Temp from "../../assets/temp.png";

export default function Header() {
  return (
    <div className="border-b border-gray-280 flex justify-between p-3 w-[402px]">
        <div className="div1">
            {/*<img src={Logo} />/  Next.js는 아래처럼*/}
            <Image src={Logo} alt="Header Logo" width={154} height={27} />
        </div>
        <div className="div2">
            <Image src={Temp} alt="종 아이콘" width={60} height={24}/>
        </div>
    </div>
  );
}
