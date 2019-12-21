export const configJson = {
  "title": "Contact List",
  "userUrl": "https://api.randomuser.me",
  "numberCards": 120,
  "tabs": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
};

export const keyExtractor = (path, object) => {
  if (!path && !object) {
    throw new Error('missing arguments')
  }
  
  if (typeof path !== 'string') {
    throw new Error('expected first argument to be a string but recieved: ', typeof path)
  }

  if (typeof object !== 'object') {
    throw new Error('expected second argument to be object but recieved: ', typeof object)
  }

  let invalidPath = false;

  return path
  .split('.')
  .reduce((acc, curKey) => {
    if (invalidPath) return acc;

    if (!acc) {
      if (!object[curKey]) {
        invalidPath = true;
        return acc;
      }
      acc = object[curKey]
    } else {
        acc = acc[curKey]
    }
    return acc || '';
  }, '')
}

export const extractUsersByKey = (path, users = []) => {
  if (!path) {
    throw new Error('path is expected as the first argument');
  }
  
  return users.reduce((usersByKey, user) => {
    const value = keyExtractor(path, user);
    if (!value) return usersByKey;
    
    const firstLetter = value[0];
    if (usersByKey[firstLetter]) {
        usersByKey[firstLetter].push(user)
    } else {
        usersByKey[firstLetter] = [user]
  }
    return usersByKey
  }, {})
}

export const fillLettersWithUsers = (letters, users) => {
  if (!Array.isArray(letters)) {
    throw new Error('expected an array as the first argument')
  }
  
  return letters.reduce((acc, cur) => {
    acc[cur] = users[cur.toUpperCase()] || []
    return acc
  }, {}) 
}
