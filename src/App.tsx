import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { AddCreator } from './pages/AddCreator';
import { EditCreator } from './pages/EditCreator';
import { ShowCreators } from './pages/ShowCreators';
import { ViewCreator } from './pages/ViewCreator';
import { supabase } from './client';

function App() {
  type CreatorProp = {
    name: string;
    url: string;
    description: string;
    imgURL: string;
    id: number;
  };

  const [creators, setCreators] = useState<CreatorProp[]>([]);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.log('Error fetching creators:', error);
        } else {
          const mappedData: CreatorProp[] = data.map((item: any) => ({
            name: item.name,
            url: item.url,
            description: item.description,
            imgURL: item.imgURL,
            id: item.id,
          }));
          setCreators(mappedData);
        }
      } catch (error) {
        console.log('Error fetching creators:', error);
      }
    };

    fetchCreators();
  }, []);

  let backgroundImgURL =
    'https://images.pexels.com/photos/2264245/pexels-photo-2264245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const headerStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImgURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderBottom: '2px solid white',
  };

  const contentStyle: React.CSSProperties = {
    marginTop: '100vh',
    minHeight: '100vh',
  };

  const h1Style: React.CSSProperties = {
    color: 'white',
    fontSize: '8em',
    marginBottom: '1rem', // Add margin bottom to create space
  };

  const [isButtonHovered1, setIsButtonHovered1] = useState(false);
  const [isButtonHovered2, setIsButtonHovered2] = useState(false);
  
  const buttonStyle: React.CSSProperties = {
    margin: '0 0.5rem',
    backgroundColor: '#0f4c81',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    width: '200px', // Set a fixed button width
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    border: '2px solid white',
  };

  return (
    <div>
      <div style={headerStyle}>
        <h1 style={h1Style}>creatorverse</h1>
        <nav>
          <ul style={{listStyle: "none", padding: 0}}>
            <Link to="/">
              <button
                style={isButtonHovered1 ? buttonHoverStyle : buttonStyle}
                onMouseEnter={() => setIsButtonHovered1(true)}
                onMouseLeave={() => setIsButtonHovered1(false)}
              >
                View All Creators
              </button>
            </Link>
            <Link to="/new">
              <button
                style={isButtonHovered2 ? buttonHoverStyle : buttonStyle}
                onMouseEnter={() => setIsButtonHovered2(true)}
                onMouseLeave={() => setIsButtonHovered2(false)}
              >
                Add a Creator
              </button>
            </Link>
          </ul>
        </nav>
      </div>

      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<ShowCreators creatorInfo={creators} />} />
          <Route path="/edit/:id" element={<EditCreator creatorInfo={creators} />} />
          <Route path="/new" element={<AddCreator />} />
          <Route path="/:id" element={<ViewCreator creatorInfo={creators} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;