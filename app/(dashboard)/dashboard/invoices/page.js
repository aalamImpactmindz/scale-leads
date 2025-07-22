"use client";
 
import { useState } from "react";
 
export default function LinkedInLogin() {
  const [status, setStatus] = useState("idle");
  const [user, setUser] = useState(null);
 
  const handleLogin = async () => {
    setStatus("opening");
    window.open("https://www.linkedin.com/login", "_blank");
 
    setStatus("waiting");
    setTimeout(() => checkCookie(), 8000); // wait 8s for user to log in
  };
 
  const checkCookie = () => {
    chrome.runtime.sendMessage({ action: "get_linkedin_data" }, async (response) => {
      if (response?.status === "connected") {
        setUser({
          name: response.name,
          image: response.profileImage,
          subscription: response.subscription,
        });
 
        setStatus("connected");
 
        // send to your backend
        await fetch("/api/save-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ li_at: response.li_at }),
        });
      } else {
        setStatus("not_connected");
      }
    });
  };
 
  return (
    <div className="border p-4 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Connectez votre compte LinkedIn</h2>
 
      {status === "connected" && user ? (
        <div className="flex items-center space-x-4">
          <img src={user.image} alt="profile" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">Abonnement: {user.subscription}</p>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🔗 Connectez-vous à LinkedIn
          </button>
          <p className="mt-2 text-sm text-gray-600">
            {status === "waiting"
              ? "Waiting for extension to detect your LinkedIn login..."
              : status === "not_connected"
              ? "Not connected. Please try again."
              : ""}
          </p>
        </div>
      )}
    </div>
  );
}
 