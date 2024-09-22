import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserScreen() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // State to manage errors

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

  const handleSendMessage = () => {
    // Navigate to the new message route with the current user's ID
    navigate(`/new-message/${id}`);
  };

  // Show loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>; // Display error message

  return (
    <main className="mx-auto w-full flex-col gap-8 flex justify-center items-center md:w-[60%]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Contact Information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Name</Label>
              <p className="text-lg font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Phone Number</Label>
              <p className="text-lg font-semibold">{user?.mobileNumber}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-2">
          <Button onClick={handleSendMessage}>Send Message</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
