var gibberish = {
  'fourSquare': {
    'clientId':
        'U2FsdGVkX19Fp7HJf5YUZmIygMFMJMLcUP8ufm2HK+GTy2ndxVvrw+iQeBc5X7bdqIXlqmeOup6m1linVeLBNaN8zYR76+PlS11n8hb/K5Y=',
    'clientSecret':
        'U2FsdGVkX19V19p1AyjQKI77NcbxyYNpEVcZ7ZAkfurnsQkwZXIMb0jyWcV1d0Q1hEeDuqtisrmmcpMPmbFfFUJJ0ETkYXUDBg2QQQmrFRY='
  },
  'mapQuest': {
    'consumerKey':
        'U2FsdGVkX1+IP7jTbgOm8OmZe2fUgs+PnpIpNr5DSIa8Jj8ct1vI3/fgbwRC9o4gG2QCCfZNZM+qhtWLGDqPCQ==',
    'consumerSecret':
        'U2FsdGVkX1+fKb1+usZrbANclfxUTYj5XW88Gw1uhGmZWR1m9g3MIfVFyXY3G0St'
  },
  'darkSky': {
    'key':
        'U2FsdGVkX1/U5/BFxgyXevioCvyo5+/mttv6bIu3q00JeLb+OqjcsaqfKMcLAIGHVZtRZP0kykBYyiaB42a30w=='
  }
}

function getSecret(api, secret) {
  return CryptoJS.AES
      .decrypt(gibberish[api][secret], 'dont.talk.about.kite.club')
      .toString(CryptoJS.enc.Utf8);
}