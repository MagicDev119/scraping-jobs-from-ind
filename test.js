var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://www.indeed.com',
  headers: {
    'Cookie': 'CSRF=CcqjWbsRiJ8tCkEZq32tOoPpd4QidtGU; CTK=1gkr2cjv7irp8800; __cf_bm=70AgrTi9T5P3JQVH4YabfFQLATpdyf_xcPN4Iu17okI-1671653530-0-AXdA/f2ykdgV5AfrgphUy3n/UCLzyKx+TQbixdrWIU0J0iMXMGWPJlkcd74tH+JhbQ4PcGenhgk4187yDr0SpXA=; _cfuvid=S3dvB2fyLPLS5e39AtsgVDDW1ueW9UgIceExwphXkIE-1671650759695-0-604800000; INDEED_CSRF_TOKEN=ZTBiFfEttWAwQ0bmSXfMleOiv9RMC4zE; JSESSIONID=DE000806ACDDF5823D8CEEC11C754A7B; LV="LA=1671650758:CV=1671650758:TS=1671650758"; PREF="TM=1671650758639:L=United+States"; RQ="q=full+time&l=United+States&ts=1671650758677&sc=0bf%3Aexrec%28%29%3B"; UD="LA=1671650758:CV=1671650758:TS=1671650758"; indeed_rcc="PREF:LV:RQ:UD"; jaSerpCount=1'
  }
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
