import SectionContainer from "./SectionContainer";
import BadgeGroup from "./BadgeGroup";
import BadgeMessage from "./BadgeMessage";
import { RiVipCrownFill } from "react-icons/ri";
import Image from "next/image";

const Podium = ({ rank1, rank2, rank3 }) => {
  const getPlayerImage = (playerName) => {
    switch (playerName) {
      case "Dev":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2016.48.04.jpeg";
      case "Mihir":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2016.48.27.jpeg";
      case "Bhavya":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2016.50.29.jpeg";
      case "Nakul":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2016.52.07.jpeg";
      case "Anirudh":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2016.59.33.jpeg";
      case "Mayank":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2017.00.19.jpeg";
      case "Sathish":
        return "https://osdblyvwidixouibqkrf.supabase.co/storage/v1/object/public/Badminton/WhatsApp%20Image%202024-05-14%20at%2017.01.05.jpeg";
      default:
        return ""; // Or set a default image here
    }
  };

  return (
    <SectionContainer className="page-banner--container py-10 flex justify-center">
      <div className="flex justify-center px-4 container podium">
        {/* Rank 2 */}
        <div className="w-[200px] flex flex-col justify-center ">
          {/* Image element */}
          <div className="h-max w-full flex items-center justify-center">
            <div className="rounded-full border-2 border-black h-16 w-16 text-3xl flex justify-center items-center overflow-hidden">
              {/* <Image src={MuskImage} alt="muskImage" height={64} width={64} /> */}
              <Image
                src={getPlayerImage(rank1)}
                alt="muskImage"
                height={64}
                width={64}
              />
            </div>
          </div>
          {/* <p className="text-center text-black">Annecy</p> */}
          <BadgeGroup alignment="center" className="mt-2">
            <BadgeMessage>{rank2} </BadgeMessage>
          </BadgeGroup>
          {/* <BadgeGroup2 alignment="center" className="mt-2">
            <BadgeMessage>AMP 19</BadgeMessage>
          </BadgeGroup2> */}
          <div className="border border-white flex justify-center items-center text-7xl text-white bg-gradient-to-r from-violet-500 to-purple-500 h-48">
            2
          </div>
        </div>
        {/* Rank 1 */}
        <div className="w-[200px] flex flex-col justify-center ">
          <div className="h-max w-full flex items-center justify-center">
            <div className="rounded-full h-10 w-10 text-3xl flex justify-center items-center">
              {" "}
              <RiVipCrownFill className="text-[#facc15]" />
            </div>
          </div>
          {/* Image element */}
          <div className="h-max w-full flex items-center justify-center">
            <div className="rounded-full border-2 border-[#facc15] h-16 w-16 text-3xl flex justify-center items-center overflow-hidden">
              <Image
                src={getPlayerImage("Nakul")}
                alt="muskImage"
                height={64}
                width={64}
              />
            </div>
          </div>
          <BadgeGroup alignment="center" className="mt-2">
            <BadgeMessage>{rank1} </BadgeMessage>
          </BadgeGroup>
          {/* <BadgeGroup2 alignment="center" className="mt-2">
            <BadgeMessage>AMP 20</BadgeMessage>
          </BadgeGroup2> */}
          <div className="border border-white flex justify-center items-center text-5xl text-white h-72 bg-gradient-to-r from-violet-500 to-purple-500">
            <svg
              className="podium__number"
              viewBox="0 0 27.476 75.03"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1, 0, 0, 1, 214.957736, -43.117417)">
                <path
                  className="fill-current text-white"
                  d="M -198.928 43.419 C -200.528 47.919 -203.528 51.819 -207.828 55.219 C -210.528 57.319 -213.028 58.819 -215.428 60.019 L -215.428 72.819 C -210.328 70.619 -205.628 67.819 -201.628 64.119 L -201.628 117.219 L -187.528 117.219 L -187.528 43.419 L -198.928 43.419 L -198.928 43.419 Z"
                />
              </g>
            </svg>
          </div>
        </div>
        {/* Rank 3 */}
        <div className="w-[200px]">
          {/* Image element */}
          <div className="h-max w-full flex items-center justify-center">
            <div className="rounded-full border-2 border-black h-16 w-16 text-3xl flex justify-center items-center overflow-hidden">
              <Image
                src={getPlayerImage("Mihir")}
                alt="muskImage"
                height={64}
                width={64}
              />
            </div>
          </div>
          <BadgeGroup alignment="center" className="mt-2">
            <BadgeMessage>{rank3} </BadgeMessage>
          </BadgeGroup>
          {/* <BadgeGroup2 alignment="center" className="mt-2">
            <BadgeMessage>AMP 18</BadgeMessage>
          </BadgeGroup2> */}
          <div className="border border-white flex justify-center items-center text-7xl text-white h-36 bg-gradient-to-r from-violet-500 to-purple-500">
            3
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Podium;
