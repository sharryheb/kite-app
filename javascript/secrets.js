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
      'U2FsdGVkX18vympKWCbgABjuY3YM5m9HwsQGBwkQKwRBx5rgezLnlGXit+ah6hOHIf9yoVG166NTjNRTyE+T8g==',
      'U2FsdGVkX19DHosg6dYIoOEYZhdYLPZAJJnws/5etAumcK89Z4vEPS+LGSXld51NVE5JDDCja6oRKEwOlqZh0A==',
      'U2FsdGVkX183/MFYG+5Y9YTgWMJXTfsBxqKT4zKX/Dlk0TW6aOspLwQaknW1EMYlZxFvT3eyKrSKY8Dt2pZx7Q==',
      'U2FsdGVkX19PXvYfuEzn6e2h6/C9+vfZ7qEToGN/AQ9Hv4aowXIUrDHV97rvKk576go7LNJrqHiBmQ2qlAfBqQ==',
      'U2FsdGVkX19VxvY7qbFLWem9n64HdPjW2kj+pVy9td7m02OmUPX/KQ6VQhSxkw51oFhSwDZPuV+T+SlfdE08zw==',
      'U2FsdGVkX19xzMnu9/fd1qm9dxmgXgQ+lLq/x5Nlri8nqdrBlqxLeoDOH2Dkagj+cWzGp7cDwc3tHNqYcfUSCg==',
      'U2FsdGVkX1992Ux7b5xxbKIX0yHGhGoUhxaOo5OZZYAwETnsBLf1DbcJnfqXr+FG7eOCrorXTdbPAOnPYpEy5w==',
      'U2FsdGVkX1+z0hIhG6AKoFgNm8eWHGWlv20C3ZkPWCgJaPVhxKjn2ZJyPTrxzxtXSTwvzw486eisg8RbHkq91A==',
      'U2FsdGVkX18XJT5gi1dXFNDGUDzFoTr+nLANJ22l3v3ui4/KtbcMCjhuWYJL7g2Q8OJDBAWg0An/WysOPGQPqA==',
      'U2FsdGVkX19EQhF0L3Z7GNy2fttfR5UAr6mNzMm8Q6IusnAq1WFYJig4UFh25ro3zEm4QZj3Hk8cOqljinXMlw==',
      'U2FsdGVkX1+y4TsFEMHNuhPy6tihXKRn6UzKFFwawmvxsI8OSRSu7frPiWLjEZtOOjhMtzDTEpFbM7AKcs7hSg==',
      'U2FsdGVkX1/YtArgvKkZWxjLBsHdAOAhQO658SRCPM9eyKvGJWBzC2i5gpiDmE1TWy6wfHjBWat+vvFSjon1sQ=='
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