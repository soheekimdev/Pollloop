import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLoader from '../common/loaders/MainLoader';
import MainLoaderStill from './parts/MainLoaderStill';
import { Check, Crown } from 'lucide-react';

type TeammateProps = {
  name: string;
  avatarUrl: string;
  leader?: boolean;
  githubUrl?: string;
  position?: string;
};

const Teammate = ({ name, avatarUrl, leader, githubUrl, position }: TeammateProps) => {
  const Content = () => (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <img className="size-32" src={avatarUrl} />
        <Check
          size={40}
          className="absolute top-3 right-0 text-pollloop-red opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <p className="flex flex-col items-center justify-center font-semibold">
        <div className="flex items-center">
          {leader ? <Crown size={16} /> : ''}
          <span>{name}</span>
        </div>
        {position ? `(${position})` : ''}
      </p>
    </div>
  );

  return (
    <li className="group">
      {githubUrl ? (
        <Link to={githubUrl} className="cursor-pointer">
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </li>
  );
};

export default function Footer() {
  const [isHover, setIsHover] = useState(false);
  return (
    <footer
      className="w-full mt-20 gap-12 flex flex-col"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex justify-center w-full flex-col items-center gap-2">
        {isHover ? <MainLoader /> : <MainLoaderStill />}
        <p className="w-full text-center text-lg">Looping Voices, Infinite Value</p>
      </div>
      <section className="flex flex-col md:flex-row justify-center gap-4 w-full">
        <div className=" flex flex-col items-center gap-4">
          <p className="text-lg font-semibold bg-body text-pollloop-light-beige w-full text-center">
            FRONTEND
          </p>
          <ul className="flex">
            <Teammate
              name="김소희"
              leader
              position="팀장"
              githubUrl="https://github.com/soheekimdev"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Kurt&facialHairType=Blank&clotheType=Overall&clotheColor=White&eyeType=Side&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Tanned"
            />
            <Teammate
              name="이햇님"
              githubUrl="https://github.com/hatnimll"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=Default&mouthType=Default&skinColor=Light"
            />
            <Teammate
              name="최푸른"
              githubUrl="https://github.com/choib1ue"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Red&graphicType=Bat&eyeType=Wink&eyebrowType=Default&mouthType=Tongue&skinColor=Pale"
            />
            <Teammate
              name="이혜민"
              githubUrl="https://github.com/kosmosticlay"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Light"
            />
          </ul>
        </div>
        <div className=" flex flex-col items-center gap-4">
          <p className="text-lg font-semibold bg-body text-pollloop-light-beige w-full text-center">
            BACKEND
          </p>
          <ul className="flex">
            <Teammate
              name="김명현"
              leader
              position="부팀장"
              githubUrl="https://github.com/Kimmyeonghyeon0"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelGreen&eyeType=Surprised&eyebrowType=Default&mouthType=Eating&skinColor=Pale"
            />
            <Teammate
              name="신현민"
              githubUrl="https://github.com/Hyunminmax"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Prescription02&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Red&eyeType=Side&eyebrowType=AngryNatural&mouthType=Smile&skinColor=Light"
            />
            <Teammate
              name="이준영"
              githubUrl="https://github.com/yichunyoung"
              avatarUrl="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            />
          </ul>
        </div>
      </section>
    </footer>
  );
}
