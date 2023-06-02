import { Card } from "../components/Card"
type CreatorProp = {
    name: string,
    url: string,
    description: string,
    imgURL: string,
    id: number
}

type creatorArrayProp = {
    creatorInfo: CreatorProp[]
}

export function ShowCreators({ creatorInfo }: creatorArrayProp) {
    return (
      <div>
        {creatorInfo && creatorInfo.length ? (
          creatorInfo.map((creator: CreatorProp, idx: number) => (
            <Card name={creator.name} url={creator.url} description={creator.description
            } imgURL={creator.imgURL} id={creator.id}/>
          ))
        ) : (
          <h2>No creators available</h2>
        )}
      </div>
    );
  }