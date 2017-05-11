import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';
import LinksList from './LinksList';
import AddLink from './AddLink';

// export default class Link extends React.Component {
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Mikes Links"/>
//         <LinksList/>
//         <AddLink/>
//       </div>
//     )
//   }
// }
export default () => {
  return (
    <div>
      <PrivateHeader title="Mike"/*{4}*//>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  )
}


// onLogout() {
//   // browserHistory.push('/');
//   Accounts.logout();
// }
// onSubmit(e){
//   e.preventDefault();
//   const url = this.refs.url.value.trim();
//
//   if(url){
//     // Links.insert({url, userId: Meteor.userId() });
//     Meteor.call('links.insert', url /*, callback not required*/);
//     this.refs.url.value = '';
//   }
// }
