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
      'U2FsdGVkX1/e4jc6wAYswuQmXAPcoItcYLJNP2CTbeDzZAcbRYvNGvbjqW/PTWsGA3oC13bFEuzC32hCFshWqQ==',
      'U2FsdGVkX19GPbLK5TnnzX4sKaCCz1QNuwADS7KMBOTWnGEx3+mNzADRyVR+GBQ+/zpImf2xknraO31KaD2c6Q==',
      'U2FsdGVkX18F2XipBMj0ELGcG7CqRHNTmrQwXN8iwZd2H608ABuyrNABmtpLFvSvBUA9/0EfDQjOcYu4iSJ9yA==',
      'U2FsdGVkX19Q4wj1NF9re0+0N1rCVENXD8TboR8RI5ynQTFPCR24Hl6Ug5EbruZUo/NeiaTal/IUoGAys+r+6g==',
      'U2FsdGVkX19ZXxkD4I1iDMKPg7LId/6DzmaFOAuV5jN93FX/oA6/Yze6SYk+GvPY9XX16WyuPk6ABVjJwdoY1Q==',
      'U2FsdGVkX18G8hEKJ6W/8cw51D5ccw/ygW2GmO7zRhC0COD+mzBrJylKi4Ej4zTblAUmB3bSLm7mZZ8FOmJR5g==',
      'U2FsdGVkX1+dx43NfoZjHKzpBhj7AbrzgtpmhChe6yAZ9brrOlbgX75phGJKf8HBsUsA4azJYBJJF4k8VEjgxg==',
      'U2FsdGVkX1/4U3MdCrenqXIvjpUx/ZdijmyvRsMcfP+dWjNuGol7l0rtytwNv1oL9CpYsQTtC9UV7VCLTo79Tw=='
    ],
    i: 4
  }
}

function getSecret(api, secret, i) {
  if (i !== undefined) gibberish[api].i = i;
  var gibber = gibberish[api][secret];
  if (Array.isArray(gibber)) gibber = gibber[gibberish[api].i];
  return CryptoJS.AES.decrypt(gibber, 'dont.talk.about.kite.club')
      .toString(CryptoJS.enc.Utf8);
}