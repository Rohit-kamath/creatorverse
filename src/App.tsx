import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
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

  return (
    <div>
      {/* static header of app */}
      <header>
        <h1>creatorverse</h1>
        <nav>
          <ul>
            <li>
              <a href="/" role="button">
                View All Creators
              </a>
            </li>
            <li>
              <a href="/new" role="button">
                Add a Creator
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div>
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
