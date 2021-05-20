/*
        call mutation
            |
            |
            V
        guess at response
            |
            |
            V
        UI updates (instant, ex: 'like' count in facebook)
            .
            .
            .
            .
        Response comes back (after mutation resolves)
            |
            |
            V
        UI updates(apollo takes response and updates its local copy of data in our react app to match the response that was actually sent and then will update our UI.)
*/

const Post = props => {
    const onLikeHandler = (id, noLikes) => {
        props.mutate({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation', // specify we are making mutation
                likePost: {
                    id,
                    __typename: 'PostType',
                    likes: noLikes + 1
                }
            }
        })
    }
}