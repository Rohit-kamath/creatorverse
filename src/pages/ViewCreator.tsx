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
  // Define styles

  const [creator, setCreator] = useState({
    id: 0,
    name: "",
    url: "",
    description: "",
    imgURL: "" // Updated property name
  });

  function openSocialMediaURL(){
    window.open(`${creator.url}`, "_blank")
  }

  const {id} = useParams()

  useEffect(() => {
    const result = creatorInfo.find(individualCreator => String(individualCreator.id) === id);
  
    if (result) {
      setCreator({
        id: result.id,
        name: result.name,
        url : result.url,
        description: result.description,
        imgURL: result.imgURL
      });
    }
  }, [creatorInfo, id]);

  const deleteCreator = async(event : any) => {
    event.preventDefault();
    const { error } = await supabase
    .from('creators')
    .delete()
    .eq('id', id)

    if(error){
      console.log(error)
    }

    window.location.href = "/"
  }

  return (
        <div className="ViewCreator">

          <section className="creator-image">
              <img src={creator.imgURL} alt={creator.name} />
          </section>

          <section className="creator-info">
              <h2>{creator.name}</h2>
              <p>{creator.description}</p>

              {creator.url !== null && creator.url !== '' ? (
                  <button className="social-button" onClick={openSocialMediaURL}><i className="fa-brands fa-youtube"></i>@{creator.url}</button>
              ) : "" }
          </section>

          <section className="modify-creator">
              <Link to={'/edit/' + creator.id}><button onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Edit</button></Link>
              <button onClick={deleteCreator} className="delete-button">Delete</button>
          </section>

        </div>
  );
}