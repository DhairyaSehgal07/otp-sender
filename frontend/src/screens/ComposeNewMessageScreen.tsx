import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";

const ComposeNewMessageScreen = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state for fetching user
  const [sendLoading, setSendLoading] = useState(false); // Loading state for sending OTP
  const [error, setError] = useState(""); // State to manage errors
  const [otp, setOtp] = useState(generateRandomOtp());
  const [message, setMessage] = useState(`HI YOUR OTP IS ${otp}`);

  // Function to generate a random six-digit number
  function generateRandomOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        if (response.data.success) {
          setUser(response.data.data); // Set user data
        } else {
          setError("User not found."); // Handle case where user is not found
        }
      } catch (error) {
        setError("Failed to fetch user."); // Handle error
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Set loading to false after request
      }
    };

    fetchUser();
  }, [id]); // Dependency array includes id

  const handleSend = async () => {
    setSendLoading(true); // Start loading when sending OTP
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/${id}/send-otp`,
        {
          mobileNumber: user?.mobileNumber,
          otp: otp,
        }
      );

      if (response.data.success) {
        console.log("OTP sent successfully:", response.data.message);
        setMessage(`OTP ${otp} sent to +91 ${user?.mobileNumber}`);
      } else {
        console.error("Failed to send OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP.");
    } finally {
      setSendLoading(false); // Stop loading after the request completes
    }
  };

  // Show loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>; // Display error message

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-4">Compose New Message</h1>
      <p className="text-lg mb-4">
        Sending OTP to mobile number: <strong>{user?.mobileNumber}</strong>
      </p>
      <p>
        <em>NOTE: </em> Here , you will see failed to test otp , if the profile
        is not Dhairya Sehgal and the mobile is not +91 9877741375 , as twilio
        sand box account requires you to verify the mobile , before it can be
        added to the list of active mobile numbers.
      </p>
      <textarea
        className="border p-2 w-full h-32 mb-4"
        value={message}
        readOnly // Make it read-only since it's a predefined message
      />
      <Button
        onClick={handleSend}
        className={`bg-primary text-white font-semibold ${
          sendLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={sendLoading} // Disable button while sending
      >
        {sendLoading ? "Sending..." : "Send"}
      </Button>
      {sendLoading && <div className="mt-2">Loading...</div>}{" "}
      {/* Show loader */}
    </div>
  );
};

export default ComposeNewMessageScreen;
