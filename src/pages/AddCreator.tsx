import { useState } from "react";
import { supabase } from "../client";

export function AddCreator() {
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imgURL: "" // Updated property name
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCreator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCreator = async (event: React.FormEvent) => {
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

  return (
    <div className="AddEditCreator">
      <form id="addCreatorForm" onSubmit={addCreator}>
        <label>Name</label>
        <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />

        <label>
          Image
          <p>Provide a link to an image of your creator. Be sure to include the http://</p>
        </label>
        <input type="text" id="imageURL" name="imgURL" value={creator.imgURL} onChange={handleChange} required />

        <label>
          Description
          <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
        </label>
        <textarea name="description" rows={3} cols={50} id="description" value={creator.description} onChange={handleChange} required></textarea>

        <h3>Social Media Links</h3>
        <p>Provide at least one of the creator's social media links.</p>

        <label>
          url
          <p>The creator's social media url</p>
        </label>
        <input type="text" id="url" name="url" value={creator.url} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
