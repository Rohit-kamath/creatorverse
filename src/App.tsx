import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import { AddCreator } from './pages/AddCreator'
import { EditCreator } from './pages/EditCreator'
import { ShowCreators } from './pages/ShowCreators'
import { ViewCreator } from './pages/ViewCreator'
import { Card } from './components/Card'
import {supabase} from './client'

function App() {
  let imgURL_test = "https://yt3.googleusercontent.com/pL8zIzxQUM0nMgtAhdQNUfMbhV0ckzU1FVZwz_EMB_s02wUPQGRJAiAIztIkU6TKtmHn_DLHxw=s900-c-k-c0x00ffffff-no-rj"
  type CreatorProp = {
    name: string,
    url: string,
    description: string,
    imgURL: string,
    id: number
  } 

  const [creators, setCreators] = useState<CreatorProp[]>([]);
  useEffect( () => {
    const fetchCreators =async () => {
      const {data} = await supabase
      .from('creators')
      .select()
      .order('created_at', { ascending: true})
      if(data !== null){
        const mappedData: CreatorProp[] = data.map((item: any) => ({
          name: item.name,
          url: item.url,
          description: item.description,
          imgURL: item.imgURL,
          id: item.id
        }));
        setCreators(mappedData);
      }
    }

    fetchCreators()
  }, [])
  return (
    <div>
      {/* static header of app */}
      <header>
        <h1>creatorverse</h1>
        <nav>
          <ul>
            <li><a href="/" role="button">View All Creators</a></li>
            <li><a href="/new" role="button">Add a Creator</a></li>
          </ul>
        </nav>
      </header>


      <div>
        <Routes>
          <Route path="/" element={<ShowCreators creatorInfo={creators}/>} />
          <Route path="/edit/:id" element={<EditCreator creatorInfo={creators}/>} />
          <Route path="/new" element={<AddCreator/>} />
          <Route path="/:id" element={<ViewCreator creatorInfo={creators}/>} />
        </Routes>
      </div>
    </div>
    
  )
}

export default App

{/* <Card name={"bofa"} url={"https://www.youtube.com/@SpongeBobOfficial"} description={"HELLO"} imgURL={imgURL_test} id={2}></Card>
<Card name={"bofa"} url={"https://www.youtube.com/@SpongeBobOfficial"} description={"HELLO"} imgURL={imgURL_test} id={2}></Card> */}