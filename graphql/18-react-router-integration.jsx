import {graphql} from 'react-apollo';
import {useQuery} from '@apollo/client';

fetchSongQuery = gql`query SongQuery($id: ID!){
    song(idL: $id){
        id
        title
    }
}`

export default SongDetail = props => {
    // need to pass query params to graphql query
    // http://localhost:3000/songs/:id
    const { loading, error, data } = useQuery(fetchSongQuery, {
        variables: {
            id: props.params.id
        }
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    return(
        <div>{data.song.title}</div>
    )
}