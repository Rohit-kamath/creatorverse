import { useState } from "react";
import { supabase } from "../client";

export function AddCreator() {
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imgURL: "" // Updated property name
  });
  

  const handleChange = (event : any) => {
    const { name, value } = event.target;
    setCreator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCreator = async (event : any) => {
    event.preventDefault();

    const { error } = await supabase.from("creators").insert([creator]);

    if (error) {
      console.log(error);
    } else {
      console.log("Creator added successfully!");
      // Reset the form after successful submission
      setCreator({
        name: "",
        url: "",
        description: "",
        imgURL: ""
      });
    }
    window.location.href = "/";
  };

  // Define styles
  const divStyle = {
    backgroundColor: "#0f4c81",
    marginBottom: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    color: "white"
  };

  const buttonStyle = {
    backgroundColor: "#0f4c81",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "border-color 0.3s ease"
  };
  
  const buttonHoverStyle = {
    ...buttonStyle,
    border: "2px solid white"
  };

  const [submitButtonStyle, setSubmitButtonStyle] = useState(buttonStyle);

  const handleButtonMouseEnter = () => {
    setSubmitButtonStyle(buttonHoverStyle);
  };

  const handleButtonMouseLeave = () => {
    setSubmitButtonStyle(buttonStyle);
  };

  return (
    <div>
      <form id="addCreatorForm" onSubmit={addCreator}>
        <div style={divStyle}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />
        </div>

        <div style={divStyle}>
          <label htmlFor="imageURL">ImageURL: </label>
          <input type="text" id="imageURL" name="imgURL" value={creator.imgURL} onChange={handleChange} required />
        </div>

        <div style={divStyle}>
          <label htmlFor="description">Description: </label>
          <textarea name="description" rows={3} cols={50} id="description" value={creator.description} onChange={handleChange} required></textarea>
        </div>

        <div style={divStyle}>
          <label htmlFor="url">Social Media URL: </label>
          <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} />
        </div>

        <div>
          <button
            type="submit"
            style={submitButtonStyle}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}