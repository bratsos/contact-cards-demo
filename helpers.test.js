import { extractUsersByKey, keyExtractor, fillLettersWithUsers } from './helpers';

describe('extractUsersByKey', () => {
  test('it should throw if called without arguments', () => {
    expect(() => {
      extractUsersByKey()
    }).toThrowError('path is expected');
  })

  test('it should return empty object when no users are supplied', () => {
    expect(extractUsersByKey('foo.bar')).toEqual({})
  })

  test('it should return an object with users', () => {
    const usersArray = [
      {
        name: 'Alex'
      },
      {
        name: 'Anna'
      },
      {
        name: 'Chris',
      }
    ]
    expect(extractUsersByKey('name', usersArray)).toEqual({
      'A': [{name: 'Alex'}, {name: 'Anna'}],
      'C': [{name: 'Chris'}]
    })
  })

  test('it should return only entries that match the given path', () => {
    const usersArray = [
      {
        name: 'Alex'
      },
      {
        name: 'Anna'
      },
      {
        name: 'Chris',
      },
      {
        user: {
          data: {
            name: 'Bob'
          }
        }
      },
      {
        user: {
          data: {
            name: 'Maria'
          }
        }
      }
    ]
    expect(extractUsersByKey('user.data.name', usersArray)).toEqual({
      'B': [{user: { data: { name: 'Bob'}}}],
      'M': [{user: { data: { name: 'Maria'}}}],
    })
  })
})

describe('keyExtractor', () => {
  test('it should throw if no arguments are supplied', () => {
    expect(() => {
      keyExtractor()
    }).toThrow('missing arguments')
  })

  test('it should throw if no object is not supplied', () => {
    expect(() => {
      keyExtractor('foo.bar')
    }).toThrow('expected second argument to be object')
  })

  test('it should throw if path is not a string', () => {
    expect(() => {
      keyExtractor({})
    }).toThrow('expected first argument to be a string')
  })

  test('it should return an empty string if path is not found', () => {
    expect(keyExtractor('foo.bar', {baz: 'test'})).toEqual('')
  })

  test('it should return the value of the matched key if it exists', () => {
    expect(keyExtractor('foo.bar.baz', {foo: { bar: { baz: 'test'}}})).toEqual('test')
  })
})

describe('fillLettersWithUser', () => {
  test('it should throw if first argument is not an array', () => {
    expect(() => {
      fillLettersWithUsers()
    }).toThrow('expected an array')
  })

  test('it should return an empty object if letters is an empty array', () => {
    expect(fillLettersWithUsers([], {})).toEqual({})
  })

  test('it should return an empty array for each letter from letters missing in users object', () => {
    const users = {
      'A': [{name: 'Alex'}],
      'C': [{name: 'Chris'}]
    }
    expect(fillLettersWithUsers(['a', 'b'], users)).toEqual({
      'a': [{name: 'Alex'}],
      'b' : []
    })
  })
})
