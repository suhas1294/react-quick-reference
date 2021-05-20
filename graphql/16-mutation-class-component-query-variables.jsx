import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class CreateSong extends Component{
    submitHandler = (event) => {
        event.preventDefault();

    }
    render(){
        return(
            <Form submit={submitHandler}>

            </Form>
        )
    }
}

// this is incomplete, please check next section
const mutation = gql`
mutation {
    addSong(title: )
}
`;

export default CreateSong;

// concept of query variables
/*
    mutation{
        addSong(title: "sfsfsfd"){
            id
            title
        }
    }
    // query variables : will be sent to mutation functions just like arguments
    mutation AddSong($title: String){
        addSong(title: $title){
            id
            title
        }
    }
    // query variables: (dont use $ sign here)
    {
        title: "something something"
    }
*/