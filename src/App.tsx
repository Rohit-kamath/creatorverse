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
    height: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Adjusted zIndex to 1
  };

  const contentStyle: React.CSSProperties = {
    marginTop: '100vh',
    minHeight: '100vh'
  };

  return (
    <div>
      <div style={headerStyle}>
        <h1>creatorverse</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">View All Creators</Link>
            </li>
            <li>
              <Link to="/new">Add a Creator</Link>
            </li>
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