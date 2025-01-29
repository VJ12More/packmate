// import React, { useState } from 'react';
// import './MlModelip.css'; // Import the CSS file

// export default function MlModelip() {
//   const [peopleCount, setPeopleCount] = useState(1);
//   const [people, setPeople] = useState([{ name: '', age: '', sex: '', healthIssues: '' }]);
//   const [tripDetails, setTripDetails] = useState({ date: '', location: '', activities: '', type: '' });

//   const handlePeopleCountChange = (e) => {
//     const count = parseInt(e.target.value, 10);
//     setPeopleCount(count);
//     setPeople(Array.from({ length: count }, () => ({ name: '', age: '', sex: '', healthIssues: '' })));
//   };

//   const handlePersonChange = (index, field, value) => {
//     const updatedPeople = [...people];
//     updatedPeople[index][field] = value;
//     setPeople(updatedPeople);
//   };

//   const handleTripDetailsChange = (field, value) => {
//     setTripDetails({ ...tripDetails, [field]: value });
//   };

//   const handleSubmit = () => {
//     console.log('People:', people);
//     console.log('Trip Details:', tripDetails);
//     alert('Form submitted! Check the console for details.');
//   };

  
  

//   return (
//     <div className="container">
//       <hr />
//       <main className="main-content">
//         <h1 className="main-title ">Plan Your Trip</h1>

//         <div className="input-group">
//           <label className="input-label">Number of People:</label>
//           <input
//             type="number"
//             min="1"
//             value={peopleCount}
//             onChange={handlePeopleCountChange}
//             className="input-field"
//           />
//         </div>

//         {people.map((person, index) => (
//           <div key={index} className="person-card">
//             <h3 className="person-title">Person {index + 1}</h3>
//             <label className="input-label">Name:</label>
//             <input
//               type="text"
//               value={person.name}
//               onChange={(e) => handlePersonChange(index, 'name', e.target.value)}
//               className="input-field"
//             />

//             <label className="input-label">Age:</label>
//             <input
//               type="number"
//               value={person.age}
//               onChange={(e) => handlePersonChange(index, 'age', e.target.value)}
//               className="input-field"
//             />

//             <label className="input-label">Sex:</label>
//             <select
//               value={person.sex}
//               onChange={(e) => handlePersonChange(index, 'sex', e.target.value)}
//               className="input-field"
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>

//             <label className="input-label">Health Issues:</label>
//             <input
//               type="text"
//               value={person.healthIssues}
//               onChange={(e) => handlePersonChange(index, 'healthIssues', e.target.value)}
//               className="input-field"
//             />
//           </div>
//         ))}

//         <div className="trip-details-card">
//           <h3 className="trip-details-title">Trip Details</h3>

//           <label className="input-label">Date:</label>
//           <input
//             type="date"
//             value={tripDetails.date}
//             onChange={(e) => handleTripDetailsChange('date', e.target.value)}
//             className="input-field"
//           />

//           <label className="input-label">Location:</label>
//           <input
//             type="text"
//             value={tripDetails.location}
//             onChange={(e) => handleTripDetailsChange('location', e.target.value)}
//             className="input-field"
//           />

//           <label className="input-label">Planned Activities:</label>
//           <textarea
//             value={tripDetails.activities}
//             onChange={(e) => handleTripDetailsChange('activities', e.target.value)}
//             className="input-field"
//           />

//           <label className="input-label">Type:</label>
//           <select
//             value={tripDetails.type}
//             onChange={(e) => handleTripDetailsChange('type', e.target.value)}
//             className="input-field"
//           >
//             <option value="">Select</option>
//             <option value="Business">Business</option>
//             <option value="Family">Family</option>
//           </select>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="submit-button"
//         >
//           Submit
//         </button>
//       </main>
//     </div>
//   );
// }


import React, { useState } from 'react';
import './MlModelip.css'; // Import the CSS file

export default function MlModelip() {
  const [peopleCount, setPeopleCount] = useState(1);
  const [people, setPeople] = useState([{ name: '', age: '', sex: '', healthIssues: '' }]);
  const [tripDetails, setTripDetails] = useState({ date: '', location: '', activities: '', type: '' });
  const [packingList, setPackingList] = useState(null); // State to store the packing list

  const handlePeopleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setPeopleCount(count);
    setPeople(Array.from({ length: count }, () => ({ name: '', age: '', sex: '', healthIssues: '' })));
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = value;
    setPeople(updatedPeople);
  };

  const handleTripDetailsChange = (field, value) => {
    setTripDetails({ ...tripDetails, [field]: value });
  };

  // const handleSubmit = async () => {
  //   try {
  //     const requestData = {
  //       location: tripDetails.location,
  //       activities: tripDetails.activities.split(",").map(act => act.trim()), // Convert activities into an array
  //       date: tripDetails.date,
  //     };

  //     console.log("Sending request:", requestData);

  //     const response = await fetch("https://packmate-2.onrender.com/generate_packing_list", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch packing list");
  //     }

  //     const data = await response.json();
  //     setPackingList(data); // Store the response in state

  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error fetching packing list. Please try again.");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Ensure activities are in array format even if only one activity is entered
      const activitiesArray = tripDetails.activities
        ? tripDetails.activities.split(",").map(act => act.trim()) // Split multiple activities by commas
        : [tripDetails.activities]; // Put single activity into an array
  
      // Prepare request data in the required format
      const requestData = {
        location: tripDetails.location, // Location (e.g., "Mumbai")
        activities: activitiesArray,    // Activities array (e.g., ["honeymoon"])
        date: tripDetails.date,         // Date in YYYY-MM-DD format (e.g., "2025-02-05")
      };
  
      console.log("Sending request:", requestData); // Log the request data for debugging
  
      // Send the request to the server
      const response = await fetch("https://packmate-2.onrender.com/generate_packing_list", {
        method: "POST", // Ensure it's a POST request
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
        body: JSON.stringify(requestData), // Convert data to JSON string
      });
  
      // Check if the response is successful
      if (!response.ok) {
        console.error("Response error status:", response.status); // Log error status for debugging
        throw new Error("Failed to fetch packing list. Status code: " + response.status);
      }
  
      // Parse the response data
      const data = await response.json();
      console.log("Received packing list:", data); // Log the received data
  
      // Update state with the received packing list
      setPackingList(data);
  
    } catch (error) {
      console.error("Error:", error); // Log any errors for debugging
      alert("Error fetching packing list. Please try again.");
    }
  };
  
  

  return (
    <div className="container">
      <hr />
      <main className="main-content">
        <h1 className="main-title ">Plan Your Trip</h1>

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
              onChange={(e) => handlePersonChange(index, 'name', e.target.value)}
              className="input-field"
            />

            <label className="input-label">Age:</label>
            <input
              type="number"
              value={person.age}
              onChange={(e) => handlePersonChange(index, 'age', e.target.value)}
              className="input-field"
            />

            <label className="input-label">Sex:</label>
            <select
              value={person.sex}
              onChange={(e) => handlePersonChange(index, 'sex', e.target.value)}
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
              onChange={(e) => handlePersonChange(index, 'healthIssues', e.target.value)}
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
            onChange={(e) => handleTripDetailsChange('date', e.target.value)}
            className="input-field"
          />

          <label className="input-label">Location:</label>
          <input
            type="text"
            value={tripDetails.location}
            onChange={(e) => handleTripDetailsChange('location', e.target.value)}
            className="input-field"
          />

          <label className="input-label">Planned Activities:</label>
          <textarea
            value={tripDetails.activities}
            onChange={(e) => handleTripDetailsChange('activities', e.target.value)}
            className="input-field"
          />

          <label className="input-label">Type:</label>
          <select
            value={tripDetails.type}
            onChange={(e) => handleTripDetailsChange('type', e.target.value)}
            className="input-field"
          >
            <option value="">Select</option>
            <option value="Business">Business</option>
            <option value="Family">Family</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit
        </button>

        {/* Display the Packing List if Available */}
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
    </div>
  );
}
