"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  getRecords,
  getRecords2,
  insertRecord,
  updateRecord,
  updateRecord2,
  insertUserID,
  getUserIDS,
} from "@/supabase/supabaseClient";
import Link from "next/link";

export default function MatchRecords({ userName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [CreateMatchModal, setCreateMatchModal] = useState(false);
  const [userToastDisplay, setUserToastDisplay] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [matchRecords, setMatchRecords] = useState([]);
  const [scoreRecords, setScoreRecords] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null); // State to store the ID of the record being edited
  // Create record states
  const [companyURL, setCompanyURL] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [applied, setApplied] = useState(false);
  const [mailed, setMailed] = useState(false);
  const [dmed, setDmed] = useState(false);
  const [DMsent, setDMsent] = useState(0); // State for DM counter
  const [random, setRandom] = useState();
  const [initialApplied, setInitialApplied] = useState(false);
  const [initialMailCount, setInitialMailCount] = useState(2);
  const [initialDMsent, setInitialDMsent] = useState(2);
  const [applyScore, setApplyScore] = useState(0);
  const [latestScore, setLatestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [latestScoreChange, setLatestScoreChange] = useState(0);
  const [mailCount, setMailCount] = useState(0); // State to track the number of mails
  const [image, setImage] = useState(""); // State to track the number of mails

  // Handle increment
  const incrementMailCount = () => {
    setMailCount((prevCount) => prevCount + 1);
  };
  const decrementMailCount = () => {
    if (mailCount > 1) {
      setMailCount((prevCount) => prevCount - 1);
    }
  };

  const incrementDMCount = () => setDMsent(DMsent + 1);
  const decrementDMCount = () => setDMsent(DMsent > 0 ? DMsent - 1 : 0);

  const fetchData = async () => {
    setIsLoading(true); // Set loading to true before fetching
    setImage(userName[3]);
    const fetchedMatches = await getRecords(userName[2]);
    const fetchedScoreRecords = await getRecords2(userName[2]);
    setMatchRecords(fetchedMatches);
    setIsLoading(false); // Set loading to false after fetching
    setLatestScore(fetchedMatches[fetchedMatches.length - 1].score);
    setLatestScoreChange(fetchedMatches[fetchedMatches.length - 1].score);
    setRandom(fetchedMatches[fetchedMatches.length - 1].score);
  };

  // Use useEffect to fetch data initially on component mount and after userName changes
  useEffect(() => {
    if (userName && userName[2]) {
      fetchData();
    }
  }, [userName]);

  const handleCreateMatchClick = async () => {
    if (!userName) {
      setUserToastDisplay(true);
      const fetchedMatches = await getRecords();
      setRandom(fetchedMatches[fetchedMatches.length - 1].score);
    } else {
      setUserToastDisplay(false);
      setCreateMatchModal(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserToastDisplay(false);
    setCreateMatchModal(false);

    try {
      setIsLoading(true);

      const userIDs = await getUserIDS();
      const userExists = userIDs.some((user) => user.user_id === userName[2]);

      if (!userExists) {
        const { error: insertError } = await insertUserID(
          userName[2],
          `${userName[0]} ${userName[1]}`,
          userName[3]
        );

        if (insertError) {
          console.log("Error inserting new user:", insertError);
          setIsLoading(false);
          return;
        }
      }

      const currentScore =
        applyScore + (dmed ? DMsent : 0) + (mailed ? mailCount : 0);
      const newTotalScore =
        currentScore + (matchRecords[matchRecords.length - 1]?.score || 0);

      const { error } = await insertRecord(
        companyURL,
        emailAddress,
        applied,
        mailed,
        dmed,
        userName[2],
        userName[0],
        newTotalScore,
        mailCount,
        DMsent,
        applyScore,
        userName[3]
      );

      if (!error) {
        // After successful submission, fetch new records
        await fetchData();

        setCompanyURL("");
        setEmailAddress("");
        setApplied(false);
        setMailed(false);
        setDmed(false);
        setCurrentScore(0);
        setMailCount(0);
        setDMsent(0);
        setApplyScore(0);
      } else {
        console.log("Error inserting record:", error);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const printLatestScore = () => {
    console.log(userName);
    console.log(matchRecords[matchRecords.length - 1].score);
  };

  const handleCheckboxChange = (checked, setFunction) => {
    setFunction(checked);

    if (setFunction === setApplied) {
      setApplyScore(checked ? 3 : 0);
    }

    const newApplied = checked
      ? applied || setFunction === setApplied
      : applied && setFunction !== setApplied;
    const newMailed = checked
      ? mailed || setFunction === setMailed
      : mailed && setFunction !== setMailed;
    const newDmed = checked
      ? dmed || setFunction === setDmed
      : dmed && setFunction !== setDmed;

    const currentScore =
      (newApplied ? applyScore : 0) + (newMailed ? 1 : 0) + (newDmed ? 1 : 0);

    setCurrentScore(currentScore);
    setIsChanged(true);
  };

  const handleCancelClick = () => {
    setCompanyURL("");
    setEmailAddress("");
    setApplied(false);
    setMailed(false);
    setDmed(false);
    setCurrentScore(0);
    setIsEditModalOpen(false);
    setIsChanged(false);
    setLatestScoreChange(latestScore);
    setDMsent(0);
    setMailCount(0);
  };

  const handleCancelClick2 = () => {
    setCompanyURL("");
    setEmailAddress("");
    setApplied(false);
    setMailed(false);
    setDmed(false);
    setCurrentScore(0);
    setMailCount(0);
    setDMsent(0);
    setCreateMatchModal(false);
    setIsChanged(false);
    setInitialApplied(0);
    setInitialMailCount(0);
    setInitialDMsent(0);
    setLatestScoreChange(latestScore);
  };

  const handleEditButtonClick = (recordId) => {
    const lastRecordId = matchRecords[matchRecords.length - 1].id;
    if (recordId === lastRecordId) {
      alert(
        "Warning: Editing the last record is not allowed, add another one below to edit this one, Thanks! "
      );
      return;
    }

    setEditRecordId(recordId);

    const recordToEdit = matchRecords.find((record) => record.id === recordId);
    setCompanyURL(recordToEdit.companyLink);
    setEmailAddress(recordToEdit.emailAddress);
    setApplied(recordToEdit.applied);
    setMailed(recordToEdit.mailed);
    setDmed(recordToEdit.DMed);
    setMailCount(recordToEdit.mailScore);
    setDMsent(recordToEdit.dmScore);
    setIsEditModalOpen(true);

    setInitialApplied(recordToEdit.applied);
    setInitialMailCount(recordToEdit.mailScore);
    setInitialDMsent(recordToEdit.dmScore);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let newScoreChange = 0;

      if (initialApplied !== applied) {
        if (initialApplied === true && applied === false) {
          newScoreChange -= 3;
        } else if (initialApplied === false && applied === true) {
          newScoreChange += 3;
        }
      }

      newScoreChange += mailCount - initialMailCount;
      newScoreChange += DMsent - initialDMsent;

      const { error: updateError } = await updateRecord(
        companyURL,
        emailAddress,
        applied,
        mailed,
        dmed,
        editRecordId,
        mailCount,
        DMsent
      );

      if (!updateError) {
        const updatedData = {
          id: editRecordId,
          companyLink: companyURL,
          emailAddress: emailAddress,
          applied: applied,
          mailed: mailed,
          DMed: dmed,
          mailScore: mailCount,
          dmScore: DMsent,
        };

        const updatedRecords = matchRecords.map((record) =>
          record.id === editRecordId ? updatedData : record
        );

        setMatchRecords(updatedRecords);

        const lastRecordId = updatedRecords[updatedRecords.length - 1].id;
        const newTotalScore =
          updatedRecords[updatedRecords.length - 1].score + newScoreChange;

        if (isNaN(newTotalScore) || newTotalScore < 0) {
          alert(
            "Operation aborted: The calculated score would become invalid."
          );
          setIsLoading(false);
          return;
        }

        const { error: scoreUpdateError } = await updateRecord2(
          lastRecordId,
          newTotalScore
        );

        if (!scoreUpdateError) {
          const finalUpdatedRecords = updatedRecords.map((record) =>
            record.id === lastRecordId
              ? { ...record, score: newTotalScore }
              : record
          );

          setMatchRecords(finalUpdatedRecords);
        } else {
          console.log(
            "Error updating the score in the last record:",
            scoreUpdateError
          );
        }

        setCompanyURL("");
        setEmailAddress("");
        setApplied(false);
        setMailed(false);
        setDmed(false);
        setCurrentScore(0);
        setMailCount(0);
        setDMsent(0);
        setEditRecordId(null);
        setIsEditModalOpen(false);
        setIsChanged(false);
      } else {
        console.log("Error updating record:", updateError);
      }
    } catch (error) {
      console.error("Error during update submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetches exact record for edit modal and initializes the states

  return (
    <div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleCreateMatchClick}
          disabled={isLoading}
          className="inline-flex w-3/5 cursor-pointer items-center justify-center gap-3 rounded-lg px-8 py-2 font-semibold text-white transition-colors duration-300 bg-blue-600 md:w-auto"
        >
          Add new
          <span className="px-1 text-white">
            <FaPlus />
          </span>
        </button>
      </div>

      <div className="relative h-[500px] mt-8 px-8 overflow-x-auto shadow-md bg-[#F3F5F8] sm:rounded-lg">
        {isLoading ? (
          <div className="w-full h-max flex justify-center">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <table className="w-full px-8 text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-lg text-gray-700 bg-gray-300">
              <tr>
                <th scope="col" className="px-4 py-8 cursor-pointer">
                  S.no.
                </th>
                <th scope="col" className="px-8 py-8">
                  Company/Job URL
                </th>
                <th
                  scope="col"
                  className="px-8 py-8"
                  onClick={printLatestScore}
                >
                  Email Address
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
                <th scope="col" className="px-4 py-8 cursor-pointer">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic data */}
              {matchRecords.map((record, index) => (
                <tr key={index} className="bg-white border-b text-lg">
                  <td className="px-4 py-8 text-lg cursor-pointer">
                    {matchRecords.indexOf(record) + 1}
                  </td>
                  <td className="px-4 py-8 text-lg">
                    <a
                      href={record.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {record.companyLink
                        ? `${record.companyLink.slice(0, 30)}...`
                        : "N/A"}
                    </a>
                  </td>
                  <td className="px-8 py-8 text-lg">
                    {record.emailAddress || "N/A"}
                  </td>
                  <td className="px-8 py-8 text-lg">
                    {record.applied ? "Yes" : "No"}
                  </td>
                  <td className="px-8 py-8 text-lg">
                    {record.mailed ? "Yes" : "No"}
                  </td>
                  <td className="px-8 py-8 text-lg">
                    {record.DMed ? "Yes" : "No"}
                  </td>
                  <td
                    className="px-4 py-8 text-lg cursor-pointer"
                    onClick={() => handleEditButtonClick(record.id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Create match modal */}
        {CreateMatchModal && (
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="false"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  {/* <div className="flex flex-col "> */}
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    You Record it, you got it
                  </h3>
                  {/* <h2 className="text-sm font-medium text-gray-900">
                      Don't lie here, bastard - David
                    </h2> */}
                  {/* </div> */}

                  <button
                    onClick={handleCancelClick2}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Company/Job URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Company/Job URL
                      </label>
                      <input
                        type="text"
                        value={companyURL}
                        onChange={(e) => setCompanyURL(e.target.value)}
                        className="block w-full mt-2 p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        required
                      />
                    </div>
                    {/* Email Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="block w-full mt-2 p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        // required
                      />
                    </div>
                    {/* Applied Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={applied}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setApplied)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        Applied ( 3 points for applying to a job, well done)
                      </label>
                    </div>

                    {/* Mailed Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={mailed}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setMailed)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        Mailed ( 1 point each for every Mail sent )
                      </label>
                    </div>
                    {/* Conditionally Render Mail Counter */}
                    {mailed && (
                      <div className="flex items-center mt-2 space-x-4">
                        <button
                          type="button"
                          onClick={decrementMailCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleDown />
                        </button>
                        <span className="text-sm font-medium text-black">
                          {mailCount} Mails sent
                        </span>
                        <button
                          type="button"
                          onClick={incrementMailCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleUp />
                        </button>
                      </div>
                    )}
                    {/* DMed Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={dmed}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setDmed)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        DMed ( 1 point each for every DM sent )
                      </label>
                    </div>
                    {/* Conditionally Render DM Counter */}
                    {dmed && (
                      <div className="flex items-center mt-2 space-x-4">
                        <button
                          type="button"
                          onClick={decrementDMCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleDown />
                        </button>
                        <span className="text-sm font-medium text-black">
                          {DMsent} DMs sent
                        </span>
                        <button
                          type="button"
                          onClick={incrementDMCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleUp />
                        </button>
                      </div>
                    )}
                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between mt-5">
                      <button
                        type="submit"
                        className="w-1/2 mr-2 p-3 text-center text-white bg-blue-600 rounded-lg"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick2}
                        className="w-1/2 ml-2 p-3 text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div
            id="edit-modal"
            tabIndex="-1"
            aria-hidden="false"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Job Application
                  </h3>
                  <button
                    onClick={handleCancelClick}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <form className="space-y-4" onSubmit={handleSubmit2}>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Company/Job URL
                      </label>
                      <input
                        type="text"
                        value={companyURL}
                        onChange={(e) => setCompanyURL(e.target.value)}
                        className="block w-full mt-2 p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="block w-full mt-2 p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                        required
                      />
                    </div>

                    {/* Applied Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={applied}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setApplied)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        Applied
                      </label>
                    </div>

                    {/* Mailed Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={mailed}
                        onChange={(e) => {
                          handleCheckboxChange(e.target.checked, setMailed);
                          // Show mail counter if mailed is true
                          if (!e.target.checked) setMailCount(0);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        Mailed
                      </label>
                    </div>

                    {/* Conditionally Render Mail Counter */}
                    {mailed && (
                      <div className="flex items-center mt-2 space-x-4">
                        <button
                          type="button"
                          onClick={decrementMailCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleDown />
                        </button>
                        <span className="text-sm font-medium text-black">
                          {mailCount} Mails sent
                        </span>
                        <button
                          type="button"
                          onClick={incrementMailCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleUp />
                        </button>
                      </div>
                    )}

                    {/* DMed Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={dmed}
                        onChange={(e) => {
                          handleCheckboxChange(e.target.checked, setDmed);
                          if (!e.target.checked) setDMsent(0);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        DMed
                      </label>
                    </div>

                    {/* Conditionally Render DM Counter */}
                    {dmed && (
                      <div className="flex items-center mt-2 space-x-4">
                        <button
                          type="button"
                          onClick={decrementDMCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleDown />
                        </button>
                        <span className="text-sm font-medium text-black">
                          {DMsent} DMs sent
                        </span>
                        <button
                          type="button"
                          onClick={incrementDMCount}
                          className="text-lg text-gray-700 border border-black rounded-full p-2 hover:bg-gray-200 transition"
                        >
                          <FaArrowAltCircleUp />
                        </button>
                      </div>
                    )}

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between mt-5">
                      <button
                        type="submit"
                        className="w-1/2 mr-2 p-3 text-center text-white bg-blue-600 rounded-lg"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        className="w-1/2 ml-2 p-3 text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
