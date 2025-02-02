import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">AI Python Tutor</h1>
      <p className="text-center text-gray-700 max-w-lg">
        Welcome to AI Python Tutor! Ask any Python-related question, and our AI-powered tutor will help you learn interactively.
      </p>
      <Chat />
    </div>
  );
}
