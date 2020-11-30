import React, { Component } from 'react'

import { connect } from 'react-redux'

import { editNote, deleteNote } from "../redux/actions/noteAction";


class AllNotes extends Component {

    handleDelete = (event) => {
        let id = this.props.note.id;
        this.props.deleteNote(id);
      };

    handleEdit = () => {
        console.log("edit");
        this.props.onEdit(this.props.note);
    };

    render() {
        const {note, user} = this.props
        return (
            <div>
                <h2>{note.title}</h2>
                <p>{note.story}</p>
                {user ? <><button onClick={this.handleEdit}>Edit</button> <button onClick={this.handleDelete}>Delete</button></>: null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.userState.user
    }
  }
  
export default connect(mapStateToProps, { editNote, deleteNote })(AllNotes);

