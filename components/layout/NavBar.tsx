import Image from 'next/image';
import TempNav from "../../assets/nav.png";

export default function NavBar() {
  return (
    <div className="border-t border-gray-280 flex justify-between p-3 w-[402px]">
        <div className="div1 py-1">
            <Image src={TempNav} alt="네비" width={354} height={45} />
        </div>
    </div>
  );
}
