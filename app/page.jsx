"use client";
import { useEffect } from "react";

export default function Index() {
  const handleModalClose = () => {
    alert("All modals closed");
    // e.g. refresh data or re-enable scrolling…
  };

  const handlePressTest = async () => {
    try {
      // Fetch the one-time auth token from the API route.
      const res = await fetch(`/api/vida`);

      if (res.ok) {
        const data = await res.json();

        // Replace with your actual Vida reseller domain to customize the iframe URL.
        const domain = "ninjoah-reseller.ngrok.io";

        // Set any parameters for which modal to open. You can find the required parameters
        // by viewing the query string parameters used by the Vida app when opening a modal.

        // Example: Edit user account modal.
        const params = {
          editUserAccount: "true",
        };

        // Example: Google Calendar integration modal.
        // const params = {
        //   agent: "2212869", // Replace with agent ID of user
        //   org: "2212869", // Replace with org ID of user
        //   integrations: "googleCalendar"
        // }

        // Example: Custom VADER integration modal.
        // const params = {
        //   agent: "2212869", // Replace with agent ID of user
        //   org: "2212869", // Replace with org ID of user
        //   integrations: "vidaApp",
        //   appId: "squareUp",
        //   appVersion: "v1"
        // }

        // Open the Vida modal with the one-time auth token and parameters.
        window.vdaModal.open(
          domain,
          data.oneTimeAuthToken,
          params
        );

        // Define a callback for when the modal is closed.
        window.vdaModal.onClose(handleModalClose);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up the modal close handler when the component unmounts.
      window.vdaModal?.offClose(handleModalClose);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-grow flex flex-col items-center justify-center">
        <button
          className={`bg-purple-700 text-white p-3 rounded-lg font-semibold mt-3}`}
          onClick={handlePressTest}
        >
          Open Modal
        </button>
      </div>
    </div>
  );
}
