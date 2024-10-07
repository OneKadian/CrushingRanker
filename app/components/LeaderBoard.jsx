"use client";
import Image from "next/image";
import BadgeGroup from "./BadgeGroup.jsx";
import BadgeMessage from "./BadgeMessage.jsx";
import Podium from "./Podium.jsx";
import SectionContainer from "./SectionContainer";
import { RiVipCrownFill } from "react-icons/ri";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getBadmintonMatches } from "@/supabase/supabaseClient";

import { FaRegEye } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function LeaderBoard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matchRecords, setMatchRecords] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);

  const calculateAMP = (playerName, matches) => {
    let totalPoints = 0;
    let matchCount = 0;

    matches.forEach((match) => {
      if (match.team1.includes(playerName)) {
        totalPoints += match.team1Score;
        matchCount++;
      } else if (match.team2.includes(playerName)) {
        totalPoints += match.team2Score;
        matchCount++;
      }
    });

    const average = matchCount > 0 ? totalPoints / matchCount : 0;
    return parseFloat(average.toFixed(1)); // Round to one decimal place
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedMatches = await getBadmintonMatches();
      setMatchRecords(fetchedMatches);

      const players = [
        "Bhavya",
        "Nakul",
        "Mihir",
        "Sathish",
        "Mayank",
        "Anirudh",
        "Dev",
      ];

      const stats = players.map((player) => {
        const matchesPlayed = fetchedMatches.filter(
          (match) =>
            match.team1.includes(player) || match.team2.includes(player)
        ).length;
        const AMP = calculateAMP(player, fetchedMatches);
        return { name: player, matches: matchesPlayed, score: AMP };
      });

      // Sort the stats array in descending order based on the score
      stats.sort((a, b) => b.score - a.score);

      setPlayerStats(stats);
      setIsLoading(false);
      console.log(stats); // Log the sorted stats array
    };

    fetchData();
  }, []);

  // Dummy array with player data

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
    <div className={`h-full ${isLoading ? "h-screen mt-12" : ""}`}>
      {isLoading ? (
        <div className="w-full h-max flex justify-center">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div>
          <SectionContainer className="page-banner--container py-10 flex justify-center">
            <div className="flex justify-center px-4 container podium">
              {/* Rank 2 */}
              <div className="w-[200px] flex flex-col justify-center ">
                {/* Image element */}
                <div className="h-max w-full flex items-center justify-center">
                  <div className="rounded-full border-2 border-black h-16 w-16 text-3xl flex justify-center items-center overflow-hidden">
                    {/* <Image src={MuskImage} alt="muskImage" height={64} width={64} /> */}
                    <Image
                      src={getPlayerImage(playerStats[1].name)}
                      alt="muskImage"
                      height={64}
                      width={64}
                    />
                  </div>
                </div>
                {/* <p className="text-center text-black">Annecy</p> */}
                <BadgeGroup alignment="center" className="mt-2">
                  <BadgeMessage>{playerStats[1].name} </BadgeMessage>
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
                      src={getPlayerImage(playerStats[0].name)}
                      alt="muskImage"
                      height={64}
                      width={64}
                    />
                  </div>
                </div>
                <BadgeGroup alignment="center" className="mt-2">
                  <BadgeMessage>{playerStats[0].name} </BadgeMessage>
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
                      src={getPlayerImage(playerStats[2].name)}
                      alt="muskImage"
                      height={64}
                      width={64}
                    />
                  </div>
                </div>
                <BadgeGroup alignment="center" className="mt-2">
                  <BadgeMessage>{playerStats[2].name} </BadgeMessage>
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
          <div className="py-24">
            <BadgeGroup alignment="center">
              <BadgeMessage>Leaderboard </BadgeMessage>
            </BadgeGroup>
            <div className="relative mt-8 px-8 overflow-x-auto shadow-md bg-[#F3F5F8] sm:rounded-lg">
              <table className="w-full px-8 text-sm text-left rtl:text-right text-gray-500">
                {/* Table head - properties */}
                <thead className="text-lg text-gray-700 bg-gray-300">
                  <tr>
                    <th scope="col" className="px-8 py-8">
                      Rank
                    </th>
                    <th scope="col" className="px-8 py-8">
                      Member
                    </th>
                    <th scope="col" className="px-8 py-8">
                      Score
                    </th>
                    <th scope="col" className="px-8 py-8">
                      Found
                    </th>
                    <th scope="col" className="px-8 py-8">
                      Applied
                    </th>
                    <th scope="col" className="px-8 py-8">
                      Mailed
                    </th>
                    <th scope="col" className="px-8 py-8">
                      DMed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through the playerStats array to create table rows dynamically */}
                  {playerStats.map((player, index) => (
                    // Table row - data
                    <tr key={index} className="bg-white border-b text-lg">
                      {/* Rank column */}
                      <th
                        scope="row"
                        className="px-8 py-8 text-lg font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>

                      {/* Member column */}
                      <td className="px-8 py-8 text-lg">
                        <div className="flex flex-col justify-center items-center">
                          <span className="rounded-full border-2 border-black h-16 w-16 text-3xl flex justify-center items-center overflow-hidden">
                            <Image
                              src={getPlayerImage(player.name)}
                              alt="playerImage"
                              height={64}
                              width={64}
                            />
                          </span>
                          <BadgeGroup alignment="center" className="mt-2">
                            <BadgeMessage>{player.name}</BadgeMessage>
                          </BadgeGroup>
                        </div>
                      </td>

                      {/* Score, Found columns */}
                      <td className="px-8 py-8 text-lg">{player.matches}</td>
                      <td className="px-8 py-8 text-lg">{player.score}</td>

                      {/* New columns: Applied, Mailed, DMed */}
                      <td className="px-8 py-8 text-lg text-center ">0</td>
                      <td className="px-8 py-8 text-lg text-center ">0</td>
                      <td className="px-8 py-8 text-lg text-center ">0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {modalVisible && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <FaRegEye className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Modal Title
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Consequatur amet labore.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Close
                      </button>
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
