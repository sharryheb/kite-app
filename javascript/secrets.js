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
      'U2FsdGVkX1+hJDYzxtEsssHSBksllWgS9DwOpRdaEg3mVL3RIHgcsv2miaoigirzqt8iyRA3qCzz8YQ9ZFMv3g==',
      'U2FsdGVkX19Ci/Q7oCSFBdrLdbvcvlWtU4QgOIjVq7zxGrDTghuDONblS3U/G+20QYUgvMyjTvSGP8IRp+H34w==',
      'U2FsdGVkX1/90mPo2TFJ0CEMs8iFX7h+qDrVXeu863NzNpAdmc+05SmT0b0Jx8zsvPPIt6jAMX/Wa4xpQmuHag==',
      'U2FsdGVkX1/OsuaHqxaHuyeEOJPaHl/o3bd2vRTKg2c8g78Qz4wH865nN4PwIOTVgHSm3i0gy8tNyCKZLIv4ZA==',
      'U2FsdGVkX18fRSs0VERxVS2ISlcEIe8wI44B330vqsvOS/0bh3N7V8GTk+P2gdqE4W5Ohub3vr8PdffRFxUOeg==',
      'U2FsdGVkX19P7kPLMKO8HpU9S6zUMiJFMIih82W8er2Pplw4cMTLhEMcKirRx3PykeIBtNOYvIBZVzJ6AWV2qQ==',
      'U2FsdGVkX1/W3BAgtjzX/jqF3woE4zeKfbhygV0JL2LE7QMqflfmuA2C3adLCZiwoyKBSmG6QZaPYF9oszlmuA==',
      'U2FsdGVkX18uv8MbdQ590rIFOBTwO9W97Mk3fczu5z3EZCcT5hEB0T8m7VgTs6408O0GWb4bk8YEVFNup2vGRA==',
      'U2FsdGVkX1+0MJmcQxxt11Ba78GLKlMBw/lGyvaxneSUhNUHJye6C8IsL8y7rXOKVzUo+k1e74vJTCti/KXRlg==',
      'U2FsdGVkX19eyf3O5TqPLDrk2rtlFOlcy7LlAp6ZE8/QlPo+Wkv4KOJ5mCAzEJXaWBff2JNbjBg5vwDhjUi26Q=='
    ],
    i: 0
  }
};
gibberish.darkSky.i = Number(localStorage.getItem('darkSkyi'));

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