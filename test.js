const indeed = require('indeed-scraper');

const queryOptions = {
  host: 'www.indeed.com',
  query: 'United States',
  jobType: 'fulltime',
  maxAge: '1',
  sort: 'date',
  limit: 3
};

indeed.query(queryOptions).then(res => {
  console.log(res); // An array of Job objects
});