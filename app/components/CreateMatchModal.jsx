"use client";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";

const MatchModal = (modalDisplay) => {
  const [modalVisible, setModalVisible] = useState(modalDisplay);

  const toggleCreateMatchModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-center sm:max-w-lg mx-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white w-[400px] flex justify-center pt-5 pb-4 ">
            <div className="w-[300px] ">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaRegEye className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Choose 4 players
                </h3>
                {/* Team 1 selection */}
                <form class="max-w-sm mx-auto">
                  <label
                    for="countries"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Select Team 1
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
                  >
                    {/* <option selected>Choose player 1</option> */}
                    <option value="US">Mayank</option>
                    <option value="CA">Sathish</option>
                    <option value="FR">Dev</option>
                    <option value="DE">Bhavya</option>
                    <option value="DE">Nakul</option>
                    <option value="DE">Mihir</option>
                    <option value="DE">Anirudh</option>
                  </select>
                  <select
                    id="countries"
                    class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
                  >
                    {/* <option selected>Choose player 2</option> */}
                    <option value="US">Mayank</option>
                    <option value="CA">Sathish</option>
                    <option value="FR">Dev</option>
                    <option value="DE">Bhavya</option>
                    <option value="DE">Nakul</option>
                    <option value="DE">Mihir</option>
                    <option value="DE">Anirudh</option>
                  </select>
                </form>
                {/* Team 2 selection */}
                <form class="max-w-sm mx-auto">
                  <label
                    for="countries"
                    class="block mb-2 mt-2 text-lg font-medium text-gray-900"
                  >
                    Select Team 2
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
                  >
                    {/* <option selected>Choose player 3</option> */}
                    <option value="US">Mayank</option>
                    <option value="CA">Sathish</option>
                    <option value="FR">Dev</option>
                    <option value="DE">Bhavya</option>
                    <option value="DE">Nakul</option>
                    <option value="DE">Mihir</option>
                    <option value="DE">Anirudh</option>
                  </select>
                  <select
                    id="countries"
                    class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
                  >
                    {/* <option selected>Choose player 4</option> */}
                    <option value="US">Mayank</option>
                    <option value="CA">Sathish</option>
                    <option value="FR">Dev</option>
                    <option value="DE">Bhavya</option>
                    <option value="DE">Nakul</option>
                    <option value="DE">Mihir</option>
                    <option value="DE">Anirudh</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={toggleCreateMatchModal}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Start Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;

<div className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <span
      className="hidden sm:inline-block sm:align-middle sm:h-screen"
      aria-hidden="true"
    >
      &#8203;
    </span>
    <div
      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-center sm:max-w-lg mx-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="bg-white w-[400px] flex justify-center pt-5 pb-4 ">
        <div className="w-[300px] ">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <FaRegEye className="h-6 w-6 text-green-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Choose 4 players
            </h3>
            {/* Team 1 selection */}
            <form class="max-w-sm mx-auto">
              <label
                for="countries"
                class="block mb-2 text-lg font-medium text-gray-900"
              >
                Select Team 1
              </label>
              <select
                id="countries"
                class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
              >
                {/* <option selected>Choose player 1</option> */}
                <option value="US">Mayank</option>
                <option value="CA">Sathish</option>
                <option value="FR">Dev</option>
                <option value="DE">Bhavya</option>
                <option value="DE">Nakul</option>
                <option value="DE">Mihir</option>
                <option value="DE">Anirudh</option>
              </select>
              <select
                id="countries"
                class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
              >
                {/* <option selected>Choose player 2</option> */}
                <option value="US">Mayank</option>
                <option value="CA">Sathish</option>
                <option value="FR">Dev</option>
                <option value="DE">Bhavya</option>
                <option value="DE">Nakul</option>
                <option value="DE">Mihir</option>
                <option value="DE">Anirudh</option>
              </select>
            </form>
            {/* Team 2 selection */}
            <form class="max-w-sm mx-auto">
              <label
                for="countries"
                class="block mb-2 mt-2 text-lg font-medium text-gray-900"
              >
                Select Team 2
              </label>
              <select
                id="countries"
                class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
              >
                {/* <option selected>Choose player 3</option> */}
                <option value="US">Mayank</option>
                <option value="CA">Sathish</option>
                <option value="FR">Dev</option>
                <option value="DE">Bhavya</option>
                <option value="DE">Nakul</option>
                <option value="DE">Mihir</option>
                <option value="DE">Anirudh</option>
              </select>
              <select
                id="countries"
                class="bg-gray-50 border my-1 border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5"
              >
                {/* <option selected>Choose player 4</option> */}
                <option value="US">Mayank</option>
                <option value="CA">Sathish</option>
                <option value="FR">Dev</option>
                <option value="DE">Bhavya</option>
                <option value="DE">Nakul</option>
                <option value="DE">Mihir</option>
                <option value="DE">Anirudh</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {/* <button
          onClick={toggleCreateMatchModal}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button> */}

        <button
          type="button"
          className="w-full mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Start Match
        </button>
        <button
          type="button"
          className="w-full mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Start Match
        </button>
      </div>
    </div>
  </div>
</div>;
