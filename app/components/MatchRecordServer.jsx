import React from "react";
import MatchRecords from "./MatchRecords.jsx";
import { currentUser } from "@clerk/nextjs";
// import { useUser } from "@clerk/clerk-react";

const MatchRecordServer = async () => {
  const user = await currentUser();
  // const { isSignedIn, user, isLoaded } = useUser();
  //   const userGame = user?.id;
  if (user) {
    return (
      <div className="py-24 bg-[#F3F5F8] mt-4">
        <MatchRecords
          userName={[user.firstName, user.lastName, user.id, user.imageUrl]}
        />
      </div>
    );
  }

  // return (
  //   <div className="py-24 bg-[#F3F5F8] mt-4">
  //     <MatchRecords userName={user ? true : false} />
  //   </div>
  // );
};

export default MatchRecordServer;
