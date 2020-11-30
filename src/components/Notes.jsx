import React, { Component } from "react";
import { connect } from "react-redux";
import AllNotes from "./AllNotes";
import { addNote, deleteNote, editNote } from "../redux/actions/noteAction";
import styled from "styled-components";
import device from "../responsive/Device";


const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};
  ${({ secondary }) =>
        secondary &&
        `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}
  ${({ showResult }) =>
        showResult &&
        `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;



class NotePosts extends Component {
  state = {
    story: "Write Notes...",
    title: "title",
    editTitle: "",
    editStory: "",
    display: "none",
    current_note: "",
    searchQuery: null,
  };
  search = (query) => {
    this.setState({ searchQuery: query });
  };
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleStoryChange = (event) => {
    this.setState({ story: event.target.value });
  };
  handleEditTitleChange = (event) => {
    this.setState({ editTitle: event.target.value });
  };
  handleStoryTitleChange = (event) => {
    this.setState({ editStory: event.target.value });
  };
  handleNote = (event) => {
    event.preventDefault();
    if (this.state.title) {
      const note = {
        title: this.state.title,
        story: this.state.story,
        id: 1 + Math.random(),
      };
      this.props.addNote(note);
    }
    this.setState({ title: "title" });
    this.setState({ story: " story..." });
  };
  onEdit = (note) => {
    this.setState({
      editTitle: note.title,
      editStory: note.story,
      current_note: note.id,
      display: "flex",
    });
  };
  onCancel = (event) => {
    event.preventDefault();
    this.setState({ display: "none" });
  };
  onSave = (e) => {
    e.preventDefault();
    for (let i = 0; i < this.props.allNotes.length; i++) {
      if (this.state.current_note === this.props.allNotes[i].id) {
        if (this.state.editTitle) {
          this.props.allNotes[i].title = this.state.editTitle;
          this.props.allNotes[i].story = this.state.editStory;
          this.setState({ display: "none", editTitle: "", editStory: "" });
          const allNotes = {
            title: this.props.allNotes[i].title,
            story: this.props.allNotes[i].story,
            id: this.props.allNotes[i].id,
          };
          this.props.editNote(allNotes);
          console.log(this.props.allNotes);
        }
      }
    }
  };
  render() {
    const { user, allNotes } = this.props;
    const { searchQuery } = this.state;
    allNotes.reverse();
    let allNotes2 = allNotes;
    if (searchQuery != null) {
      // for(let i = 0; i < allNotes.length; i++){
      //     if (allNotes[i].title.includes(searchQuery)){
      //         newNote.push(allNotes[i])
      //     }
      // }
      allNotes2 = allNotes.filter(
        (note) => note.title.includes(searchQuery) === true
      );
    }
    // console.log(newNote)
    console.log(allNotes2);
    return (
      <div>
        {/* <Search search={this.search} /> */}
        <AppTitle >
            Note app
        </AppTitle>
        {user ? (
          <>
            <form>
              <div>
                <input
                  type="text"
                  placeholder={this.state.title}
                  onChange={this.handleTitleChange}
                />
              </div>
              <div>
                <textarea
                  id="story"
                  name="story"
                  rows="5"
                  cols="50"
                  placeholder={this.state.story}
                  onChange={this.handleStoryChange}
                />
              </div>
              <button onClick={this.handleNote}>Submit</button>
            </form>
            <form style={{ display: this.state.display }}>
              <div>
                <input
                  type="text"
                  value={this.state.editTitle}
                  onChange={this.handleEditTitleChange}
                />
              </div>
              <div>
                <textarea
                  id="edit_story"
                  name="edit_story"
                  rows="5"
                  cols="50"
                  value={this.state.editStory}
                  onChange={this.handleStoryTitleChange}
                />
              </div>
              <button onClick={this.onCancel}>Cancel</button>
              <button onClick={this.onSave}>Save</button>
            </form>
          </>
        ) : null}
        {allNotes2
          ? allNotes2.map((note) => (
              <AllNotes key={note.id} note={note} onEdit={this.onEdit} />
            ))
          : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    allNotes: state.noteState.note,
  };
};

export default connect(mapStateToProps, { addNote, deleteNote, editNote })(
  NotePosts
);
