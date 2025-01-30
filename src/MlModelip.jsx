import React, { useState, useEffect } from "react";
import "./MlModelip.css";
import { Webchat, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";

// ✅ Replace with your actual Botpress Client ID
const clientId = "937df5a6-4a7e-4994-8a10-fa0916b4e18b";

// ✅ Ensure themeConfig is properly initialized with a fallback
let themeConfig;
try {
  themeConfig = buildTheme({
    themeName: "prism",
    themeColor: "#634433",
  });
} catch (error) {
  console.error("Error generating theme:", error);
  themeConfig = { theme: {}, style: {} }; // Fallback theme
}

export default function MlModelip() {
  const [peopleCount, setPeopleCount] = useState(1);
  const [people, setPeople] = useState([{ name: "", age: "", sex: "", healthIssues: "" }]);
  const [tripDetails, setTripDetails] = useState({ date: "", location: "", activities: "", type: "" });
  const [packingList, setPackingList] = useState(null);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const [client, setClient] = useState(null);

  // ✅ Properly Initialize Botpress Client
  useEffect(() => {
    async function initializeClient() {
      try {
        const clientInstance = await getClient({ clientId });
        setClient(clientInstance);
      } catch (error) {
        console.error("Error initializing Botpress client:", error);
      }
    }
    initializeClient();
  }, []);

  // ✅ Function to toggle webchat visibility
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  const handlePeopleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setPeopleCount(count);
    setPeople(Array.from({ length: count }, () => ({ name: "", age: "", sex: "", healthIssues: "" })));
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = value;
    setPeople(updatedPeople);
  };

  const handleTripDetailsChange = (field, value) => {
    setTripDetails({ ...tripDetails, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const activitiesArray = tripDetails.activities
        ? tripDetails.activities.split(",").map((act) => act.trim())
        : [tripDetails.activities];

      const requestData = {
        location: tripDetails.location,
        activities: activitiesArray,
        date: tripDetails.date,
      };

      console.log("Sending request:", requestData);

      const response = await fetch("https://packmate-2.onrender.com/generate_packing_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to fetch packing list. Status code: " + response.status);

      const data = await response.json();
      console.log("Received packing list:", data);
      setPackingList(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching packing list. Please try again.");
    }
  };

  return (
    <div className="container">
      <hr />
      <main className="main-content">
        <h1 className="main-title">Plan Your Trip</h1>
        <div className="input-group">
          <label className="input-label">Number of People:</label>
          <input
            type="number"
            min="1"
            value={peopleCount}
            onChange={handlePeopleCountChange}
            className="input-field"
          />
        </div>

        {people.map((person, index) => (
          <div key={index} className="person-card">
            <h3 className="person-title">Person {index + 1}</h3>
            <label className="input-label">Name:</label>
            <input
              type="text"
              value={person.name}
              onChange={(e) => handlePersonChange(index, "name", e.target.value)}
              className="input-field"
            />
            <label className="input-label">Age:</label>
            <input
              type="number"
              value={person.age}
              onChange={(e) => handlePersonChange(index, "age", e.target.value)}
              className="input-field"
            />
            <label className="input-label">Sex:</label>
            <select
              value={person.sex}
              onChange={(e) => handlePersonChange(index, "sex", e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label className="input-label">Health Issues:</label>
            <input
              type="text"
              value={person.healthIssues}
              onChange={(e) => handlePersonChange(index, "healthIssues", e.target.value)}
              className="input-field"
            />
          </div>
        ))}

        <div className="trip-details-card">
          <h3 className="trip-details-title">Trip Details</h3>
          <label className="input-label">Date:</label>
          <input
            type="date"
            value={tripDetails.date}
            onChange={(e) => handleTripDetailsChange("date", e.target.value)}
            className="input-field"
          />
          <label className="input-label">Location:</label>
          <input
            type="text"
            value={tripDetails.location}
            onChange={(e) => handleTripDetailsChange("location", e.target.value)}
            className="input-field"
          />
          <label className="input-label">Planned Activities:</label>
          <textarea
            value={tripDetails.activities}
            onChange={(e) => handleTripDetailsChange("activities", e.target.value)}
            className="input-field"
          />
          <label className="input-label">Type:</label>
          <select
            value={tripDetails.type}
            onChange={(e) => handleTripDetailsChange("type", e.target.value)}
            className="input-field"
          >
            <option value="">Select</option>
            <option value="Business">Business</option>
            <option value="Family">Family</option>
          </select>
        </div>

        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>

        {packingList && (
          <div className="packing-list">
            <h2>Packing List:</h2>
            <ul>
              {packingList.items?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* ✅ Floating Chatbot Icon */}
      <div className="chatbot-widget">
        <Fab onClick={toggleWebchat} />
      </div>

      {/* ✅ Botpress Webchat - Only render if client is initialized */}
      {isWebchatOpen && client && themeConfig?.theme && themeConfig?.style && (
        <div style={{ position: "absolute", bottom: 60, right: 20 }}>
          <Webchat client={client} theme={themeConfig.theme} style={themeConfig.style} />
        </div>
      )}
    </div>
  );
}
