import Config from 'react-native-config'
import fetch, {createBearerHeader} from './api'

export const deleteAccount = async firebase => await fetch(
  `${Config.EUTOPIC_API}/accounts`,
  'DELETE',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const cancelAccountDeletion = async firebase => await fetch(
  `${Config.EUTOPIC_API}/accounts/cancelled-deletions`,
  'POST',
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
