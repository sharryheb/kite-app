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
      'U2FsdGVkX19iqfPFqi8rSGeRuKWtn+YHul8VSIVdM12QLo7P89pM4P2gVBZWp/Wo7LMmjyp1MlY89AyLKmdjeg==',
      'U2FsdGVkX19iVKG8VTnipVUioWZDtybECtHPuhCYae1W9edc/1pqK3ZfxozLiQWpO08srxMJaFOV2N4vzKb8Fg==',
      'U2FsdGVkX18R/Xnsjr5847lX50nDRakVB6DGRgMiKtu+MFZnoWp7AScQKWAOG8bLOs1yhWZ3jr5bFt4ymtA5Ww==',
      'U2FsdGVkX1+xNz4rkcf2C8pWgBdDcVTr3pV5zE0MInl+sLCFShWasgsOQQE2Ezd8daPWOneiS+qC9sw6ERO7xA==',
      'U2FsdGVkX1/0lqnEXTHc8H4JSiiHqBIQSbRC+qwEKNFzGIx+VxQ0iZa+bPiS+88+hHJ2zFZFasopQ5sLoijV1A==',
      'U2FsdGVkX19IJwynYAlKZR3mB5idQzeGN38omIs+13KYSRy1bMQS28WAEnmoae9EkDQUIgajBku+9tINzEadHw==',
      'U2FsdGVkX19EmnfxOnFT7Xd8iY5X+JNkLVTlz/t3qZoJWh7e0vcAWCpkrASGe42MioyDB3HfDPrhafeWHQj5bw==',
      'U2FsdGVkX18psT2iyqgNhb/sGMTUvVNWh4Mt8A0hNIACrznZOY2E90XvDnkWXkb627FcFAKrpEqXbUrH+X/IBQ==',
      'U2FsdGVkX19S066Rw5U0YYumluuLhDiwDLJWKPr1G5gN0w7M+LrA0NYLrc7Jpq2b4/roMjZqEPVruHQaNSMsvg=='
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