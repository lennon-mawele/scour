'use strict'

const scour = require('../../scour')

const data = {
  users: {
    1: { name: 'john' },
    2: { name: 'jake' },
    3: { name: 'ara' }
  }
}

const list = [
  { name: 'apple' },
  { name: 'banana' }
]

var item

describe('.at()', function () {
  it('works', function () {
    expect(scour(data).go('users').at(0).get('name'))
      .toEqual('john')
  })

  describe('with OOB on objects', function () {
    before(function () {
      item = scour(data).go('users').at(999)
    })

    it('has a value of undefined', function () {
      expect(item.value).toEqual(undefined)
    })
  })

  it('works for arrays', function () {
    expect(scour(list).at(0).get('name'))
      .toEqual('apple')
  })

  describe('with OOB on lists', function () {
    before(function () {
      item = scour(list).at(999)
    })

    it('has a value of undefined', function () {
      expect(item.value).toEqual(undefined)
    })
  })
})

describe('.getAt()', function () {
  it('works', function () {
    expect(scour(data).go('users').getAt(0))
      .toEqual({ name: 'john' })
  })

  it('works for arrays', function () {
    expect(scour(list).getAt(0))
      .toEqual({ name: 'apple' })
  })

  it('works when OOB', function () {
    expect(scour(data).go('users').getAt(99))
      .toEqual(undefined)
  })

  it('works for arrays when OOB', function () {
    expect(scour(list).getAt(99))
      .toEqual(undefined)
  })
})