import Config from 'react-native-config'
import fetch, {createBearerHeader} from './api'

export const deleteAccount = async (
  firebase,
  deleteRequest = true,
) => await fetch(
  `${Config.EUTOPIC_API}/accounts?delete_request=${deleteRequest}`,
  'DELETE',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const fetchAccount = async firebase => await fetch(
  `${Config.EUTOPIC_API}/accounts`,
  'GET',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)
