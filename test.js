var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://www.indeed.com/jobs?q=full+time&l=United+States&sc=0bf%3Aexrec%28%29%3B&fromage=1',
  headers: {
    'Cookie': 'CTK=1gkr2cjv7irp8800; __cf_bm=_GCDxSYHCC0O.aPLo8B11b.Ca6ktROGhGUKrGUwYwrA-1671650759-0-AYtibmBMhFTdWdPmWSJ1+kbVNdFFzPabpHZnGcpoPhgWZmSexe11uv93lwU+KZzxPqB71dqfe+8/x5PX72Xmw5Y=; _cfuvid=S3dvB2fyLPLS5e39AtsgVDDW1ueW9UgIceExwphXkIE-1671650759695-0-604800000; INDEED_CSRF_TOKEN=ZTBiFfEttWAwQ0bmSXfMleOiv9RMC4zE; JSESSIONID=DE000806ACDDF5823D8CEEC11C754A7B; LV="LA=1671650758:CV=1671650758:TS=1671650758"; PREF="TM=1671650758639:L=United+States"; RQ="q=full+time&l=United+States&ts=1671650758677&sc=0bf%3Aexrec%28%29%3B"; UD="LA=1671650758:CV=1671650758:TS=1671650758:SG=47a413ba027610c3bb07b881f1b715f7"; ctkgen=1; indeed_rcc=""; jaSerpCount=1'
  }
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
  });
