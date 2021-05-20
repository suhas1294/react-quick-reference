import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class CreateSong extends Component{
    state = {
        title: ''
    }

    submitHandler = (event) => {
        event.preventDefault();
        // this.props.mutate() will invoke that function which is tied to our component
        this.props.mutate({
            variables: {
                title: this.state.title
            }
        })
        .then(() => history.push('/')) // redirect back the user after creation of song.
        .catch(err => console.error(err))
    }
    render(){
        return(
            <Form submit={submitHandler}>

            </Form>
        )
    }
}

// when we wrap mutation, we also get access to props.mutate
const mutation = gql`
mutation AddSong($title: String){
    addSong(title: $title){
        title
    }
}
`;

export default graphql(mutation)(CreateSong);
