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
        const domain = "vida.io";

        // Set any parameters for which modal to open.
        // For example, to edit the user account, you can pass `editUserAccount: true`.
        // Recreate params for any modal by using the query strings seen when opening
        // a modal in the Vida app.
        const params = {
          editUserAccount: "true",
        };

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
