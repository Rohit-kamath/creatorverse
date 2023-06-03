import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

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

export function EditCreator({ creatorInfo }: creatorArrayProp) {
  const { id } = useParams();
  const [creator, setCreator] = useState({
    id: 0,
    name: '',
    description: '',
    url: '',
    imgURL: '',
  });

  useEffect(() => {
    const result = creatorInfo.find((individualCreator) => String(individualCreator.id) === id);

    if (result) {
      setCreator({
        id: result.id,
        name: result.name,
        url: result.url,
        description: result.description,
        imgURL: result.imgURL,
      });
    }
  }, [creatorInfo, id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateCreator = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({ name: creator.name, url: creator.url, description: creator.description, imgURL: creator.imgURL })
      .eq('id', id);

    if (error) {
      console.log(error);
    }

    window.location.href = '/';
  };

  const deleteCreator = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      console.log(error);
    }

    window.location.href = '/';
  };

  // Define styles
  const divStyle = {
    backgroundColor: '#0f4c81',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    color: 'white',
  };

  const buttonStyle = {
    backgroundColor: '#0f4c81',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    border: '2px solid white',
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
      <form id="addCreatorForm" onSubmit={updateCreator}>
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
          <textarea
            name="description"
            rows={3}
            cols={50}
            id="description"
            value={creator.description}
            onChange={handleChange}
            required
          ></textarea>
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

          <button
            type="button"
            style={{ ...submitButtonStyle, marginLeft: '1rem', backgroundColor: 'red' }}
            onClick={deleteCreator}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}