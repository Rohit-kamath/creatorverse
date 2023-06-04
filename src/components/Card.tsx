import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

type CardProps = {
  name: string;
  url: string;
  description: string;
  imgURL: string;
  id: number;
};

export function Card({ name, url, description, imgURL, id }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '600px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0.5rem',
    border: '2px solid white',
    position: 'relative'
  };

  const buttonStyle: React.CSSProperties = {
    color: 'white',
    borderRadius: '50%',
    backgroundColor: "#0f4c81",
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'border-color 0.3s',
    cursor: 'pointer',
    border: '2px solid transparent'
  };

  const buttonHoverStyle: React.CSSProperties = {
    borderColor: isHovered ? 'white' : 'transparent'
  };

  const cardContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const cardFooterStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '0.5rem'
  };

  return (
    <div className="card-container">
      <article className="card" style={cardStyle}>
        <div>
          <h2 style={{ color: 'white' }}>{name}</h2>
        </div>
        <div style={cardContentStyle}>
          <p style={{ color: 'white' }}>{description}</p>
          {url !== null && url !== '' ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...buttonStyle, ...buttonHoverStyle }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              social media link
            </a>
          ) : (
            "didn't render"
          )}
        </div>
        <div style={cardFooterStyle}>
          <Link to={`/${id}`}> <FontAwesomeIcon icon={faInfoCircle} /> </Link>
          <Link to={`/edit/${id}`}> <FontAwesomeIcon icon={faEdit} /> </Link>
        </div>
      </article>
    </div>
  );
}