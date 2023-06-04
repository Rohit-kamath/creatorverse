import { Card } from "../components/Card";
import { useState, useEffect } from 'react';

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

export function ShowCreators({ creatorInfo }: creatorArrayProp) {
  const [creators, setCreators] = useState<CreatorProp[]>([]);

  useEffect(() => {
    setCreators(creatorInfo);
  }, [creatorInfo]);

  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridRowGap: '20px',
    justifyContent: 'center',
  };

  return (
    <div style={gridContainerStyle}>
      {creators && creators.length ? (
        creators.map((creator: CreatorProp) => (
          <Card
            name={creator.name}
            url={creator.url}
            description={creator.description}
            imgURL={creator.imgURL}
            id={creator.id}
            key={creator.id}
          />
        ))
      ) : (
        <h2>No creators available</h2>
      )}
    </div>
  );
}