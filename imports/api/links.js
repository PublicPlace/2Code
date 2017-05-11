import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links')

// only runs on server // Meteor.isServer // Meteor.isClient
if (Meteor.isServer) {
    // ▼ Metoer.userId() not allowed in publish functions
          // Meteor userId()
    // ▼ Can´t use arrow function as 'this' binding is not working
          // Meteor.publish('linksPub', () => {
    Meteor.publish('linksPub', function () {

    // ▼ Publication > expose all data via cursor - user specific later
    // return Links.find();

    // ▼ Publication > expose data containing string "4" via cursor
    //    - user specific via this.userId
    return Links.find({userId: this.userId});
  });
}

// Server & Client // ES5 Function => this binding required
Meteor.methods({
//  resource.action
//  emails.archive
//  using '.-syntax' in function name => bypassing using ''
  'links.insert'(url){
    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({url});

    Links.insert({ // insert document > url: url, ES6 property shorthand
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisited: null
    });
  },
  'links.setVisibility'(_id, visible){
    // Check if user is logged in
    console.log(_id, visible);
    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    // _id is string with length greater than 1
    // & visible is a booleann
      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        },
        visible: {
          type: Boolean
        }
      }).validate({_id, visible});
    // links.udate - where _id and this.userId match the doc
    // Set the visible property to the visible argument
      Links.update({
          _id,
          userId: this.userId
        },{
          $set:{ visible }
      });
  },
  'links.trackVisit'(_id){
    new SimpleSchema({
      _id:
      {
        type: String,
        min: 1
      }
    }).validate({_id});
    Links.update({_id}, {
      $set: {
        lastVisited: new Date().getTime()
      },
      $inc: {
        visitedCount:1
      }
    })
  }
});
  // // used on an object > ES6 object method syntax possible
  // // greetUser: function(){
  // greetUser(name = 'User > Default') {
  //   console.log('greetUser is running');
  //   if(name = "Mike"){
  //     throw new Meteor.Error('invalid-arguments', 'Name is required');
  //   }
  //   return `Hello ${name}!`
  // },
  // addNumbers(a, b) {
  //   // console.log('addNumbers is running');
  //   if(typeof a !== 'number' || typeof b !== 'number'){
  //     throw new Meteor.Error('a', 'b');
  //   } else {
  //     return `Summe ${a+b}`
  //   }
  // }
