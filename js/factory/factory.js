const factoryName = 'ComicBooks'

const factory = function ($http, $q) {
  const publicKey = '5a237863b3cc2061003cbbc4fe20dc06'
  const baseUrl = 'http://gateway.marvel.com/v1/'
  const hash = 'bd4b447a65ef5d6b174f87cf9db6d2db'
  const query = '&apikey=' + publicKey + '&hash=' + hash + '&ts=1'
  const limit = 100

  const findOne = function (id) {
    const def = $q.defer()
    const url = baseUrl + 'public/characters/' + id + query.replace('&', '?')
    $http.get(url).success(def.resolve).error(def.reject)

    return def.promise
  }

  const findNext = function (offset) {
    const def = $q.defer()
    const url = baseUrl + 'public/characters?limit=' + limit + '&offset=' + (limit * offset) + query
    $http.get(url).success(def.resolve).error(def.reject)

    return def.promise
  }

  const LoadMore = function () {
    this.offset = 0
    this.busy = false
    this.characters = []

    this.load = () => {
      if (this.busy) {
        return
      }
      this.busy = true
      findNext(this.offset).then((results) => {
        const chars = results.data.results

        chars.forEach((item) => {
          this.characters.push(item)
        })

        this.offset++
        this.busy = false
      })
    }
  }

  return {
    find: find,
    findOne: findOne,
    LoadMore: LoadMore
  }
}

factory.$inject = [
  '$http',
  '$q'
]

export { factoryName, factory }
