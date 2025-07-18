import React, { useState } from "react";
import Popup from "../Popup";

const TestPopup: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={() => setPopupOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Popup
      </button>

      <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Popup Content</h2>
        <p className="mb-4 text-gray-700">
          This is the content inside the popup.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setPopupOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default TestPopup;