import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    pName: "",
    pDate: "",
    city: "",
    newCity: "",
    hospital: "",
    newHospital: "",
  });

  const [arrayFormData, setArrayFormData] = useState([]);
  const [cities, setCities] = useState([
    "Select City",
    "Anand",
    "I will enter city name",
  ]);
  const [hospitals, setHospitals] = useState({}); // Stores hospitals city-wise

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let selectedCity =
      formData.city === "I will enter city name"
        ? formData.newCity
        : formData.city;
    let selectedHospital =
      formData.hospital === "I will enter hospital name"
        ? formData.newHospital
        : formData.hospital;

    if (!selectedCity || !selectedHospital) {
      alert("Please select or enter a city and hospital name.");
      return;
    }

    const obj = {
      pName: formData.pName,
      pDate: formData.pDate,
      city: selectedCity,
      hospital: selectedHospital,
    };

    setArrayFormData([...arrayFormData, obj]);

    // Add new city to dropdown if it's a new entry
    if (
      formData.city === "I will enter city name" &&
      formData.newCity.trim() !== ""
    ) {
      setCities([
        ...cities.slice(0, -1),
        formData.newCity,
        "I will enter city name",
      ]);
    }

    // Add new hospital to the city-specific hospital list
    if (!hospitals[selectedCity]) {
      hospitals[selectedCity] = [];
    }
    if (
      formData.hospital === "I will enter hospital name" &&
      formData.newHospital.trim() !== ""
    ) {
      setHospitals((prevHospitals) => ({
        ...prevHospitals,
        [selectedCity]: [
          ...(prevHospitals[selectedCity] || []),
          formData.newHospital,
        ],
      }));
    }

    // Reset form
    setFormData({
      pName: "",
      pDate: "",
      city: "",
      newCity: "",
      hospital: "",
      newHospital: "",
    });
  };

  return (
    <center>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter patient name"
          name="pName"
          value={formData.pName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="date"
          placeholder="Enter date"
          name="pDate"
          value={formData.pDate}
          onChange={handleChange}
          required
        />
        <br />
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <br />
        {formData.city === "I will enter city name" && (
          <input
            type="text"
            placeholder="Enter your city name"
            name="newCity"
            value={formData.newCity}
            onChange={handleChange}
            required
          />
        )}
        <br />

        {/* Show hospital dropdown when city is selected OR when adding a new city */}
        {(formData.city && formData.city !== "Select City") ||
        formData.newCity ? (
          <>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
            >
              <option value="">Select Hospital</option>
              {(
                hospitals[formData.city] ||
                hospitals[formData.newCity] ||
                []
              ).map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
              <option value="I will enter hospital name">
                I will enter hospital name
              </option>
            </select>
            <br />
            {formData.hospital === "I will enter hospital name" && (
              <input
                type="text"
                placeholder="Enter hospital name"
                name="newHospital"
                value={formData.newHospital}
                onChange={handleChange}
                required
              />
            )}
          </>
        ) : null}
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Patient Data</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>City</th>
            <th>Hospital</th>
          </tr>
        </thead>
        <tbody>
          {arrayFormData.map((item, index) => (
            <tr key={index}>
              <td>{item.pName}</td>
              <td>{item.pDate}</td>
              <td>{item.city}</td>
              <td>{item.hospital}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
}

export default App;
