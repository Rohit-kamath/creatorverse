import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";

type CreatorProp = {
  name: string;
  url: string;
  description: string;
  imgURL: string;
  id: number;
};

type creatorArrayProp = {
  creatorInfo: CreatorProp[];
};

export function ViewCreator({ creatorInfo }: creatorArrayProp) {
  const { id } = useParams();
  const [creator, setCreator] = useState<CreatorProp>({
    id: 0,
    name: "",
    url: "",
    description: "",
    imgURL: "",
  });
  const [hoveredButton, setHoveredButton] = useState<string>("");

  useEffect(() => {
    const result = creatorInfo.find((individualCreator) => String(individualCreator.id) === id);

    if (result) {
      setCreator(result);
    }
  }, [creatorInfo, id]);

  const repeatStyle = {
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  };
  const commonButtonStyle = {
    backgroundColor: "#0f4c81",
    ...repeatStyle,
  };

  const viewButtonStyle = {
    ...commonButtonStyle,
    ...(hoveredButton === "url" && { border: "2px solid white" }),
  };

  const editButtonStyle = {
    ...commonButtonStyle,
    ...(hoveredButton === "edit" && { border: "2px solid white" }),
  };

  const deleteButtonStyle = {
    backgroundColor: "red",
    ...repeatStyle,
    ...(hoveredButton === "delete" && { border: "2px solid white" }),
  };

  const handleButtonMouseEnter = (buttonName: string) => {
    setHoveredButton(buttonName);
  };

  const handleButtonMouseLeave = () => {
    setHoveredButton("");
  };

  const openSocialMediaURL = () => {
    console.log(creator.id);
    if (creator.url) {
      const url = creator.url.startsWith("http") ? creator.url : `http://${creator.url}`;
      window.open(url, "_blank");
    }
  };

  const handleDeleteConfirmation = async () => {
    // Show custom confirmation dialog
    const shouldDelete = await customConfirm("Are you sure you want to delete this creator?");

    if (shouldDelete) {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) {
        console.log(error);
      }
      window.location.href = "/";
    }
  };

  const customConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const confirmed = window.confirm(message);
      resolve(confirmed);
    });
  };

  return (
    <div>
      <section>
        <img src={creator.imgURL} alt={creator.name} />
      </section>

      <section>
        <h2 style={{color : "white"}}>{creator.name}</h2>
        <p style={{color : "white"}}> {creator.description}</p>

        {creator.url && (
          <button
            onClick={openSocialMediaURL}
            style={viewButtonStyle}
            onMouseEnter={() => handleButtonMouseEnter("url")}
            onMouseLeave={handleButtonMouseLeave}
          >
            {creator.url}
          </button>
        )}
      </section>

      <section>
        <Link to={"/edit/" + creator.id}>
          <button
            onClick={() => {}}
            style={editButtonStyle}
            onMouseEnter={() => handleButtonMouseEnter("edit")}
            onMouseLeave={handleButtonMouseLeave}
          >
            Edit
          </button>
        </Link>

        <button
          onClick={handleDeleteConfirmation}
          style={deleteButtonStyle}
          onMouseEnter={() => handleButtonMouseEnter("delete")}
          onMouseLeave={handleButtonMouseLeave}
        >
          Delete
        </button>
      </section>
    </div>
  );
}