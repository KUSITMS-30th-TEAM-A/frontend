import Image from 'next/image';
import logoIcon from '../../../assets/svg/hitzone_logo.svg';

const Page = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-main-0">
            <Image src={logoIcon} alt="Logo" width={258} height={45} />
        </div>
    )
}

export default Page