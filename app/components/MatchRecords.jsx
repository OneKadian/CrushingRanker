"use client";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import BadgeGroup from "./BadgeGroup";
import BadgeMessage from "./BadgeMessage";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  getRecords,
  getRecords2,
  insertRecord,
  updateRecord,
  supabase,
} from "@/supabase/supabaseClient";
import Link from "next/link";

export default function MatchRecords({ userName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [CreateMatchModal, setCreateMatchModal] = useState(false);
  const [userToastDisplay, setUserToastDisplay] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [matchRecords, setMatchRecords] = useState([]);

  const [scoreRecords, setScoreRecords] = useState({});
  const [originalScore, setOriginalScore] = useState(0);
  const [updatedScore, setUpdatedScore] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [editData, setEditData] = useState([]);
  const [editRecordId, setEditRecordId] = useState(null); // State to store the ID of the record being edited
  // Create record states
  const [companyURL, setCompanyURL] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [applied, setApplied] = useState(false);
  const [mailed, setMailed] = useState(false);
  const [dmed, setDmed] = useState(false);
  const [DMsent, setDMsent] = useState(2); // State for DM counter

  // score changes after editing
  const [latestScore, setLatestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [latestScoreChange, setLatestScoreChange] = useState(0);

  // mail scoring
  const [mailCount, setMailCount] = useState(2); // State to track the number of mails

  // Handle increment
  const incrementMailCount = () => {
    setMailCount((prevCount) => prevCount + 1);
  };

  // Handle decrement
  const decrementMailCount = () => {
    if (mailCount > 1) {
      setMailCount((prevCount) => prevCount - 1);
    }
  };

  const incrementDMCount = () => setDMsent(DMsent + 1);
  const decrementDMCount = () => setDMsent(DMsent > 0 ? DMsent - 1 : 0);

  // Fetches all records and latest score
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      const fetchedMatches = await getRecords();
      const fetchedScoreRecords = await getRecords2(userName[2]);
      const CurrentScoreRecord =
        await fetchedScoreRecords[fetchedScoreRecords.length - 1];
      setScoreRecords(CurrentScoreRecord);
      setMatchRecords(fetchedMatches);
      setIsLoading(false); // Set loading to false after fetching
      setLatestScore(CurrentScoreRecord.score);
      setLatestScoreChange(CurrentScoreRecord.score);
      console.log(latestScore);
      console.log(latestScoreChange);
    };

    fetchData();
  }, [userName]);

  // Runs when edit button is clicked
  const handleEditButtonClick = (recordId) => {
    setEditRecordId(recordId); // Store the ID of the record being edited
    // Set the current values of the record to the state variables to populate the form
    const recordToEdit = matchRecords.find((record) => record.id === recordId);
    setCompanyURL(recordToEdit.companyLink);
    setEmailAddress(recordToEdit.emailAddress);
    setApplied(recordToEdit.applied);
    setMailed(recordToEdit.mailed);
    setDmed(recordToEdit.DMed);
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleCreateMatchClick = () => {
    if (!userName) {
      setUserToastDisplay(true); // Show user toast if userName is not valid
    } else {
      setUserToastDisplay(false); // Hide user toast if userName is valid
      setCreateMatchModal(true); // Open create match modal
    }
  };

  // Submit new record and update latest score
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserToastDisplay(false);
    setCreateMatchModal(false);

    try {
      setIsLoading(true);

      // Calculate the new total score by adding the current score to the latest score from the records
      const newTotalScore =
        currentScore + matchRecords[matchRecords.length - 1]?.score || 0;

      // Insert the new record with the calculated total score
      const { error } = await insertRecord(
        companyURL,
        emailAddress,
        applied,
        mailed,
        dmed,
        userName[2],
        userName[0],
        newTotalScore // Pass the calculated total score here
      );

      if (!error) {
        // Fetch the updated records after inserting a new one
        const fetchedRecords = await getRecords();
        setMatchRecords(fetchedRecords);

        // Reset the form fields after successful insertion
        setCompanyURL("");
        setEmailAddress("");
        setApplied(false);
        setMailed(false);
        setDmed(false);
        setCurrentScore(0); // Reset the current score to zero

        // Fetch the latest score record for the user and update the state
        const fetchedScoreRecords = await getRecords2(userName[2]);
        const currentScoreRecord =
          fetchedScoreRecords[fetchedScoreRecords.length - 1];
        setScoreRecords(currentScoreRecord);
        setLatestScore(currentScoreRecord.score);
      } else {
        console.log("Error inserting record:", error);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Prints latest score and score record
  const printLatestScore = () => {
    console.log(latestScore); // current latest score
    console.log(latestScoreChange); // the latest score record
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked, setFunction) => {
    // Update the checkbox state
    setFunction(checked);

    // Calculate the current score directly using the latest values of all checkboxes
    const newApplied = checked
      ? applied || setFunction === setApplied
      : applied && setFunction !== setApplied;
    const newMailed = checked
      ? mailed || setFunction === setMailed
      : mailed && setFunction !== setMailed;
    const newDmed = checked
      ? dmed || setFunction === setDmed
      : dmed && setFunction !== setDmed;

    // Calculate the new score based on the checkbox states
    const currentScore =
      (newApplied ? 1 : 0) + (newMailed ? 1 : 0) + (newDmed ? 1 : 0);

    setCurrentScore(currentScore);
    setIsChanged(true); // Enable the submit button if any changes are made
  };

  // Handle cancel button click - resets all states except latestScore
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
    setDMsent(2);
    setMailCount(2);

    // setLatestScoreChange(0);
  };

  const handleCancelClick2 = () => {
    setCompanyURL("");
    setEmailAddress("");
    setApplied(false);
    setMailed(false);
    setDmed(false);
    setCurrentScore(0);
    setMailCount(2);
    setCreateMatchModal(false); // Assuming this state controls the visibility of the CreateMatchModal
    setIsChanged(false);
    setLatestScoreChange(latestScore);
  };

  const updateMatchRecords = (editRecordId, updatedData) => {
    return new Promise((resolve) => {
      setMatchRecords((prevRecords) => {
        const updatedRecords = prevRecords.map((record) =>
          record.id === editRecordId ? { ...record, ...updatedData } : record
        );
        resolve(updatedRecords); // Resolve the promise once the state update is complete
        return updatedRecords; // Return the updated records to set the state
      });
    });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update the record in the database using the stored ID
      const { error } = await updateRecord(
        companyURL,
        emailAddress,
        applied,
        mailed,
        dmed,
        editRecordId // Pass the ID of the record being edited
      );

      if (!error) {
        // Directly update the matchRecords state without re-fetching and await the update
        const updatedData = {
          companyLink: companyURL,
          emailAddress: emailAddress,
          applied: applied,
          mailed: mailed,
          DMed: dmed, // Update DMed status immediately
        };
        await updateMatchRecords(editRecordId, updatedData); // Await the state update

        // Reset the form fields and state variables after the state has been updated
        setCompanyURL("");
        setEmailAddress("");
        setApplied(false);
        setMailed(false);
        setDmed(false);
        setCurrentScore(0);
        setEditRecordId(null); // Clear the ID of the record being edited
        setIsEditModalOpen(false); // Close the edit modal
        setIsChanged(false); // Reset the change detection
      } else {
        console.log("Error updating record:", error);
      }
    } catch (error) {
      console.error("Error during update submission:", error);
    } finally {
      setIsLoading(false); // Stop the loading spinner once everything is done
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
                  <td className="px-8 py-8 text-lg">
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
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Job Application Form
                  </h3>
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
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setMailed)
                        }
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
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setDmed)
                        }
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
                    onClick={handleCancelClick} // Update to call handleCancelClick
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
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={applied}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setApplied)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Applied
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={mailed}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setMailed)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Mailed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={dmed}
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, setDmed)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        DMed
                      </label>
                    </div>

                    <div className="flex justify-between mt-5">
                      <button
                        type="submit"
                        className="w-1/2 mr-2 p-3 text-center text-white bg-blue-600 rounded-lg"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick} // Cancel button triggers handleCancelClick
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
