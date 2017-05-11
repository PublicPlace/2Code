import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'
import moment from 'moment'
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';


Meteor.startup(() => {
  let now = new Date()
  console.log(now);

  // let momentNow = moment()
  // console.log(momentNow.format('MMM Do, YYYY '));
  // console.log(momentNow.format('h:ma'));
  let momentNow = moment(0)
  console.log(momentNow.fromNow());


WebApp.connectHandlers.use((req, res, next) => {
  const _id = req.url.slice(1);
  const link = Links.findOne({_id}); // link > undefind || match

  if (link) {
    res.statusCode = 302;
    // res.setHeader('Location', 'http://www.google.de');
    res.setHeader('Location', link.url);
    res.end();
    Meteor.call('links.trackVisit', _id);
  } else {
    next()
  }
});

  WebApp.connectHandlers.use((req, res, next) => {
    //  request comes in
    //  run our middleware one at a time
    //  send them that page
    console.log('This is from my custom middleware');
    console.log(req.url, req.method, req.headers, req.query);
    //  PASSIVE > Set HTTP status code
        // 404 page not found 400 bad request 503 service temporarily not available >> Check:httpstatuses.com
    //  res.statusCode = 404;

    //  PASSIVE > Set HTTP headers
    //  res.setHeader('my-header', 'Mike was here');

    //  ACTIVE > Set HTTP body
    //  res.write('<h1>This is my middleware at work</h1>');

    //  ACTIVE > End HTTP request
    //  res.end();
    next();
  });
});
