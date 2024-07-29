import React, { useState, useEffect } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// Sample data for search results
const sampleData = [
  {
    id: 1,
    title: "Upcoming Events",
    description: "Latest events in our college",
  },
  {
    id: 2,
    title: "Training & Placement",
    description: "Placement opportunities and training programs",
  },
  {
    id: 3,
    title: "Student Resources",
    description: "Resources available for students",
  },
  {
    id: 4,
    title: "Faculty Directory",
    description: "Information about faculty members",
  },
  {
    id: 5,
    title: "Campus Facilities",
    description: "Details about facilities available on campus",
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Filter sampleData based on searchQuery
    const results = sampleData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchQuery]);

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <main style={{ padding: "2rem 0" }}>
        <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Search Results
          </h1>
          <div style={{ marginBottom: "1.5rem" }}>
            <InputGroup>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#ddd",
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    padding: "0.375rem 0.75rem",
                  }}
                >
                  <FaSearch />
                </div>
                <FormControl
                  style={{
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                    border: "1px solid #ddd",
                    borderLeft: "none",
                    paddingLeft: "0.75rem",
                  }}
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-icon"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </InputGroup>
          </div>
          <div>
            {filteredResults.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {filteredResults.map((result) => (
                  <li
                    key={result.id}
                    style={{
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <h5>{result.title}</h5>
                    <p>{result.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ textAlign: "center" }}>No results found</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
