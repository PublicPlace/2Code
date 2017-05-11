import React from 'react';
import {Links} from '../api/links';
import { Meteor } from 'meteor/meteor';
// import { browserHistory } from 'react-router';
import Modal from 'react-modal';
// ES6 react component
export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error:''
    };
  }
  onChange(e){
    e.preventDefault();
    // e.target.value
    this.setState({
      url: e.target.value/*.trim() > Prevent input of spaces */
    });
  }
  onSubmit(e){
    e.preventDefault();
    // const url = this.refs.url.value.trim();
    // const url = this.state.url;
    // ES6 Destructuring
    const {url} = this.state;

    // if(url){
    // Links.insert({url, userId: Meteor.userId() });
    Meteor.call('links.insert', url, (err, res) => {
      if(!err){
        // this.setState({url:"", isOpen:false, error:''});
        this.handleModalClose()
        // this.refs.url.value = '';
      } else {
        this.setState({error:err.reason})
      }
    });
    // }
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen:true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link</h1>
          {this.state.error? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button type="button" onClick={this.handleModalClose.bind(this)} className="button button--secondary">Close</button>
          </form>
        </Modal>
      </div>
    )
  }
}
