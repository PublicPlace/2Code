import { Meteor }  from 'meteor/meteor';
import React from 'react';
import moment from 'moment'
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      justCopied: false
    };
  }
componentDidMount(){
  this.clipboard = new Clipboard(this.refs.copy);

  this.clipboard.on('success', () => {
    this.setState ({justCopied: true});
    //  Expression syntax
    setTimeout(() => this.setState({justCopied: false}), 1000);

  }).on('error', () => {
    alert('unable to copy. PLease manually copy the link')
  })
}
componentWillUnmount(){
  this.clipboard.destroy();
}
renderStats(){
  const visitMessage = this.props.visitedCount === 1? 'visit' : 'visits';
  let visitedMessage = null;
  if(typeof this.props.lastVisited === 'number') {
    visitedMessage = `(visited ${moment(this.props.lastVisited).fromNow()})`
  }
  return (
    <p className="item__message ">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  );
}
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message ">{this.props.shortUrl}</p>
        {/*<p>{this.props.visible.toString()}</p>*/}
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
          Visit
        </a>
        {/* <p>{this.props.visitedCount} - {this.props.lastVisited}</p> */}
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  // ...link
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount:React.PropTypes.number.isRequired,
  lastVisited:React.PropTypes.number /*allow null*/

}
