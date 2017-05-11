import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';


//   Lifecycle methods required
//   => error function in Stateless functional component
//   => ES6 class based component

export default class LinkListfilters extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showVisible: true
    };
  }
  componentDidMount(){
    this.LinksListFiltersTracker = Tracker.autorun(() => {
      this.setState ({
        showVisible: Session.get('showVisible')
      })
    });

  }
  componentWillUnmount(){
    this.LinksListFiltersTracker.stop();
  }
  render() {
    return(
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) => {
              // console.log(e.target.checked);
              Session.set('showVisible', !e.target.checked)
            }}/>
          show hidden links
        </label>
      </div>
    );
  }
}
// Stateless functional component
// export default () => {
//   return(
//     <div>
//       <label>
//         <input type="checkbox" onChange={(e) => {
//           // console.log(e.target.checked);
//           Session.set('showVisible', !e.target.checked)
//         }}/> show hidden links
//       </label>
//     </div>
//   );
// };
