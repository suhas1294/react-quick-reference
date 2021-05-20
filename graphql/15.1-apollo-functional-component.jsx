import { gql, useQuery } from '@apollo/client';

const SongList = props => {
    const { loading, error, data } = useQuery(GET_SONGS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <>
            {data.songs.map(song => (
                <option key={song.id} value={song.title}>
                    {song.title}
                </option>
            ))}
        </>
    )
}
const GET_SONGS = gql`
  query GetSongs {
    songs { # this variable is what appears in this.props.data.songs
        id
        title
    }
  }
`;