import { useState } from "react";

const APIKeyModal = ({ onSave }: { onSave: (key: string) => void }) => {
  const [key, setKey] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Enter API Key</h2>
        <input
          className="w-full p-2 border rounded mb-2"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Your API Key"
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={() => onSave(key)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default APIKeyModal;
