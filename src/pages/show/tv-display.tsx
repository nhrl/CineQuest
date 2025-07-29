import { useParams } from "react-router-dom";

function TvDisplay() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || '');
  const id = decodedQuery.split('-').pop();

  return (
    <div className='border-1 text-white'>
      <h1>Displaying Series ID: {id}</h1>
      <h2>Full Query: {decodedQuery}</h2>
    </div>
  );
}

export default TvDisplay;
