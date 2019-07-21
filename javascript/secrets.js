var gibberish = {
  'fourSquare': {
    'clientId':
        'U2FsdGVkX18ybEDP7dzQnyUWzTK12EMiXxXnC2a14Omxe1qEGu+AA+JNGMF5AZylSOUTISncgloKamq1xEJmO2tweWufWxJXNXSVZJk5zkA=',
    'clientSecret':
        'U2FsdGVkX18igGzops/ZuyvYg9S+MQWQ/k43EPAW46TkT6KmPNXlTfQqlDQKgw66d3GVLEVJ4PidRlxNPvnDoapAH1uk6ZleWRjk1kN7Bsc='
  },
  'mapQuest': {
    'consumerKey':
        'U2FsdGVkX18Bm6tEfmQ9D9Uue0Dd9mGKPYfJWe1w5gIV7EC0uSVGCDcpdLpZjWLQCSRyM32oE3y+t8i4t9xd/A==',
    'consumerSecret':
        'U2FsdGVkX1/cWNfUxpN+rynC+AySwJPuBFbBMVPfIiU6I5YGViSh67KKgVOaTEKQ'
  },
  'darkSky': {
    'keys': [
      'U2FsdGVkX1/Q3t+g1hn3oO+2+p42Xyv6e/Pgg4vJ92Hh2iep8mYgn5BeN2f0EN9YKr4D17KV04B77juzSFUQ9w==',
      'U2FsdGVkX1/XKYmDzx7pPvqoj79Lj9biiVeM3o/lJdN3/kpnzvi/h2kLP66n8GJbb30M86XuAWtv0paleQZPRw==',
      'U2FsdGVkX1+x59PjxUc6oSdkCfhrDxq+8VbZde+Zpv89Nig0KAQnxQonSTHPrKi0JkWblSqIsBGTGpzy52dW6Q==',
      'U2FsdGVkX18CJ5Ow6sHDHi+rdECbzeVWRTTGcx/MmnFIvLybnovf6ThTwwAnLa2g1mKqrgYHOqnVaORGkUNDPA==',
      'U2FsdGVkX19D5fNpyMsj2vTgRD1T2IZbYtlv4USSLWz++oDft50aSSfpz4LNpzg2X7TFpoGegORzuzqgbaBfug==',
      'U2FsdGVkX19AuG17jhyc6sew7XBmf7KpTA1liLa3ZyJ/gFOCeSnbcNjdP7dc4NvogXZ8WYVW8EC6vPOz5phwMA==',
      'U2FsdGVkX1+G0YYLlyaCawgD9/0VWP8eVnknyK/qNuaWkzlY2EQTdwdAouBWSQojWxLRAjDX6O6fV7evd8ICTg==',
      'U2FsdGVkX18ZunUieW/79OqRYuj9zHnk22oxgnrt+60sMFuxAD1WS+pTsZunXPmZMH2zue8sToHuScn3ya4ddg==',
      'U2FsdGVkX1/wR/YsgS6oTQ7Y4zl3IFdwVUOk1yYrrt89qUNSW5Dl3sK+ONUX2APq90FA8lQNJhp8k8Nl13Qgcg==',
      'U2FsdGVkX198YPJP3sRVvbVJe5/YbitB0kB26hooaT0ipv4RumltDq3PluupDi6N2wrCTTn9lS59vAUdmGMMkA==',
      'U2FsdGVkX198QkRFvFjGrWgc8lr89TLxjwhzbgTDLuYS4qs5MdboU7FzinKJiAXnyr+sA3HYNabUh3gwqdqgzQ==',
      'U2FsdGVkX18Vci3ckX1K5BK4st7G8qHQ6SFNHx469udTzXVGz1V0ptcV2uSB+xcIU9kocdvlDBPcV/8NLvpH5A==',
      'U2FsdGVkX19rmK66UMDniJeIM+XxkSTzc2s+Zmo5iiL8uH8UwS0YQ6nbICu5RecRaoMKrXwZb2fyQS5m2CIHhg=='
    ],
    i: 0
  },
  'accuWeather': {
    'keys': [
      'U2FsdGVkX19bEK8B/96OtjBHqoAblzWKbRzd8zB+5CtyawmUnNmK76n50elFYZEPrwoBLvs+L2GN05iFGwdTFA=='
    ],
    i: 0
  }
};
gibberish.darkSky.i = Number(localStorage.getItem('darkSkyi'));
gibberish.accuWeather.i = Number(localStorage.getItem('accuWeatheri'));

function getSecret(api, secret, i) {
  if (i !== undefined) {
    gibberish[api].i = i;
    localStorage.setItem(api + 'i', gibberish[api].i);
  }
  var gibber = gibberish[api][secret];
  if (Array.isArray(gibber)) gibber = gibber[gibberish[api].i];
  return CryptoJS.AES.decrypt(gibber, 'dont.talk.about.kite.club')
      .toString(CryptoJS.enc.Utf8);
}