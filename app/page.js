import Footer from "./components/Footer.jsx";
import SectionContainer from "./components/SectionContainer.jsx";
import LeaderBoard from "./components/LeaderBoard.jsx";

export default function Home() {
  return (
    <>
      <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20 ">
        {/* Page Banner  */}
        {/* <Podium /> */}
        <SectionContainer id="faq" className="faq">
          <LeaderBoard />
        </SectionContainer>
        {/* Archive */}
      </div>
      <Footer />
    </>
  );
}
