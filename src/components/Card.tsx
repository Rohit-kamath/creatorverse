import { Link } from 'react-router-dom'

type CardProps = {
    name: string,
    url: string,
    description: string,
    imgURL: string,
    id: number
}

export function Card( {name, url, description, imgURL, id} : CardProps) {
    function redirectYoutube() : void{
        window.open(`${url}`)
    }

    const cardStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
    return (
        <article className= "card" style={cardStyle}>
            <article>
                <div>
                    <h2>{name}</h2>
                    {url !== null && url !== '' ? (
                        <span onClick={redirectYoutube}></span>
                    ) : "didn't render"}
                </div>
                <div className="card-header-edit">
                    <Link to={`/${id}`} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}></Link>
                    <Link to={`/edit/${id}`} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}></Link>
                </div>
                <div>
                    <p className='test'>{description}</p>
                </div>
            </article>
        </article>
    )
}