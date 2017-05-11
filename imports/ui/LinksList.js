import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move'


export default class LinksList extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      links: []
    };

  }
  componentDidMount(){
    // console.log('CompoentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub')
      const links = Links.find({
        // visible: true
        visible: Session.get('showVisible')
      }, {
        sort: {
          url: -1
        }
      }).fetch();
      this.setState({ links })
      // console.log(links);
    });
  }
  componentWillUnmount(){
    // console.log('componentWillUnmount LinksList');
    this.linksTracker.stop()
  }
  renderLinksListItems(){
      if(this.state.links.length === 0) {
        return (
          <div className="item">
            <p className="item__status-message">No links found to display</p>
          </div>
        );
      }


    return this.state.links.map((link) => {
      // return <p key={link._id}>{link.url}</p>
    const shortUrl = Meteor.absoluteUrl(link._id)
    //  this.props.link to equal an object
    //  this.props.userId

    // return <LinksListItem key={link._id} _id={link._id} />
    return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}      /* Spread operator > key value pair > props on component
             ...link > _id, url, userId */ />;
    });

    // if (this.props.links.length === 0) {
    //   return (
    //     <div>
    //       <p>NO LINKS YET</p>
    //     </div>
    //   )
    // } else {
    //     return this.props.links.map((link) => {
    //       return <p key={link._id}>url</p>
    //     });
    //   }
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
