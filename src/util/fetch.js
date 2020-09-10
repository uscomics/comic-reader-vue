// const SERVERS = ['https://gentle-dusk-67062.herokuapp.com/', 'https://gentle-dusk-67062.herokuapp.com/']
const SERVERS = ['http://localhost:1337/', 'http://localhost:1337/']
const fetchDataFromServer = async (urlFragment, store) => {
  const params = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: { Accept: 'application/json' }
  }
  return serverCommunication(urlFragment, params, store)
}

const fetchTextFromServer = async (urlFragment, store) => {
  const params = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: { Accept: 'text/plain' }
  }
  return serverCommunication(urlFragment, params, store)
}

const postDataToServerWithJSONResponse = async (urlFragment, data, store) => {
  const params = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'text/plain' },
    body: data
  }
  return serverCommunication(urlFragment, params, store)
}

const serverCommunication = async (urlFragment, params, store) => {
  try {
    const url = SERVERS[0] + urlFragment
    store.commit('addStatusMessage', 'Fetching ' + url)
    const response = await fetch(url, params)
    if (response.ok) {
      const result = (params.headers.Accept == 'application/json')? await response.json() : await response.text()
      store.commit('addStatusMessage', 'Fetch of ' + url + ' successful.')
      return result
    } else {
      toggleServers()
      const url = SERVERS[0] + urlFragment
      store.commit('addErrorMessage', 'Could not fetch ' + urlFragment)
      store.commit('addStatusMessage', 'Fetching ' + url)
      const response = (params) ? await fetch(url, params) : await fetch(url)
      if (response.ok) {
        const result = (params.headers.Accept == 'application/json')? await response.json() : await response.text()
        store.commit('addStatusMessage', 'Fetch of ' + url + ' successful.')
        return result
      } else {
        store.commit('addErrorMessage', 'Could not fetch ' + urlFragment)
        return null
      }
    }
  } catch (e) {
    store.commit('addErrorMessage', 'Failed to fetch ' + urlFragment + '. Error is ' + e)
  }
}

const pingServer = async (baseURL, store) => {
  const response = await fetch(baseURL + 'ping/server')
  if (response.ok) return true
  return false
}

const pingServers = async (store) => {
  store.commit('addStatusMessage', 'Pinging API servers.')
  let message = 'Ping: ' + await pingServer(SERVERS[0])
  store.commit('addStatusMessage', message)
  message = 'Ping: ' + await pingServer(SERVERS[1])
  store.commit('addStatusMessage', message)
}

const toggleServers = () => {
  const s = SERVERS[0]
  SERVERS[0] = SERVERS[1]
  SERVERS[1] = s
}

export { fetchDataFromServer, fetchTextFromServer, pingServers, postDataToServerWithJSONResponse }
