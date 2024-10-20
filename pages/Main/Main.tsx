import Image from 'next/image';
import Zone from '../../assets/zone.svg';
import Team from "../../assets/team.png";
import Button from "../../assets/Button.png";

const MainHome=() => {
  return (
    <div className='w-[402px]'>
        <h3 className='px-2 py-5 font-bold'>오늘은 어느 야구장에 방문하시나요?</h3>
        <Image src={Zone} alt="Zone Image" width={376} height={356} />
        <div className='flex justify-center text-center py-5'>
          <Image className="" src={Team} alt="팀" width={241} height={22}/>
        </div>
        <div className='flex justify-center text-center py-5'>
          <Image src={Button} alt="버튼" width={370} height={60}/>
        </div>
    </div>
  );
}

export default MainHome