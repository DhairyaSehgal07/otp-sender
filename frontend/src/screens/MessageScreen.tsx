import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useFetchMessages } from "@/hooks/useMessages";

const MessageScreen = () => {
  const { messages, loading, error } = useFetchMessages(); // Destructure loading and error
  console.log(messages);

  // Sort messages in descending order by createdAt
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Container for the heading */}
      <div className="flex justify-between items-center w-full md:w-[80%] mx-auto mb-6">
        <h1 className="text-2xl font-bold">List of Messages Sent</h1>
      </div>

      {/* Message cards */}
      <div className="mx-auto w-full md:w-[80%] space-y-4">
        {sortedMessages.map((message) => (
          <Card key={message._id} className="border">
            <CardHeader>
              <CardTitle>
                {message.user
                  ? `${message.user.firstName} ${message.user.lastName}`
                  : "Unknown"}
              </CardTitle>
              <CardDescription>
                Sent at: {new Date(message.createdAt).toLocaleString()} | OTP:{" "}
                {message.message.split(" ").pop()} {/* Extract OTP */}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MessageScreen;
