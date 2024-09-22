import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useFetchUsers } from "@/hooks/useUsers";
import axios from "axios";
import { toast } from "react-toastify";
const HomeScreen = () => {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/users/${userId}`
        );
        if (response.data.success) {
          // toast.success("User deleted successfully");
          window.location.reload(); // Refresh the page
        }
      } catch (error: any) {
        toast.error(error.response?.data.message || "Failed to delete user");
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      {/* Container for the heading and add button */}
      <div className="mx-8 text-center m-12">
        <h1 className="text-xl">A few notes about this app</h1>
        <ol className="list-decimal list-inside">
          <li>
            This app is built on the MERN stack and utilizes modern technologies
            for a seamless experience.
          </li>
          <li>
            Twilio only allows registered phone numbers. After verifying your
            mobile, you can send messages using the sandbox.
          </li>
          <li>
            For testing purposes, send a message to the profile: Dhairya Sehgal
            and check the list of messages for the OTP.
          </li>
          <li>
            To navigate to homescreen any time on the app , you can click on the
            heading Otp-sender-app
          </li>
          <li>
            GitHub Repo link:{" "}
            <strong>
              <a
                href="https://github.com/DhairyaSehgal07/otp-sender"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/DhairyaSehgal07/otp-sender
              </a>
            </strong>
          </li>
        </ol>
      </div>

      <div className="flex justify-between items-center w-full md:w-[80%] mx-auto mb-6">
        <h1 className="text-2xl font-bold">List of Users</h1>

        {/* Add User button that links to /add-user */}
        <Link
          to="/add-user"
          className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark"
        >
          Add User
        </Link>
      </div>

      {/* User cards */}
      <div className="mx-auto w-full md:w-[80%] space-y-4">
        {users.map((user) => (
          <div key={user._id}>
            <Link to={`/user/${user._id}`} className="cursor-pointer">
              <Card className="my-4">
                <CardHeader>
                  <CardTitle>
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription>{user.mobileNumber}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
