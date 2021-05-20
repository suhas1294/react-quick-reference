// this pattern is for class based components only

const SongList = props => {
    onSongDelete = id => {
        this.props.mutate({variables: { id }})
        .then(() => this.props.data.refetch()) // when the query that needs to be run is associated with same component, then we can use refetch() method given by graphql library, else use an alternate query : refetchQueries: [{ query: query, variables: "<optional as above line>" }], refer 16.3 file
    }
}

query = gql``;

mutation = gql``;

// passing multiple  
export default graphql(mutation)(
    graphql(query)(SongList)
)