import React, {Component} from 'react';
import gql from 'graphql-tag'; // helper to write queries inside component file
import {graphql} from 'react-apollo'; // bond query with component

class SongList extends Component{
    // when component is rendered, query is automatically made and populated.
    // when query is completed, data is stored in props
    // this.props.data.songs
    render(){
        return(
            <>
                <ul>
                    {this.props.data.songs && this.props.data.songs.map(s => <li>s.title</li> )}
                </ul>
            </>
        )
    }
}

const query = gql`
    {
        songs{
            title
        }
    }
`;

export default graphql(query)(SongList);