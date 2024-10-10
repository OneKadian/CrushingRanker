import Footer from "./components/Footer.jsx";
import SectionContainer from "./components/SectionContainer.jsx";
import LeaderBoard from "./components/LeaderBoard.jsx";
// import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  // const user = await currentUser();

  return (
    <>
      <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20 ">
        {/* Page Banner  */}
        {/* <Podium /> */}
        <SectionContainer id="faq" className="faq">
          <LeaderBoard
          // userName={[user.firstName, user.lastName, user.id, user.imageUrl]}
          />
        </SectionContainer>
        {/* Archive */}
      </div>
      <Footer />
    </>
  );
}
