import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {View} from 'react-native'
import {
  Button,
  Dialog,
  Image,
  Text,
} from '@rneui/themed'
import {formatDistance, addDays} from 'date-fns'
import {Context} from '../../core/Store'
import {deleteAccount, fetchAccount} from '../../../services/account'
import SuccessIcon from '../../../assets/checkbox-circle-line.png'
import ErrorIcon from '../../../assets/alert-fill.png'
import WarnIcon from '../../../assets/warn-fill.png'
import useStyles from './styles'

const DeleteAccount = () => {
  const [state] = useContext(Context)
  const [account, setAccount] = useState()
  const [fetchAccountError, setFetchAccountError] = useState(false)
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false)
  const [deleteRequestLoading, setDeleteRequestLoading] = useState(false)
  const [deleteRequestSuccess, setDeleteRequestSuccess] = useState(false)
  const [deleteRequestError, setDeleteRequestError] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const run = async () => {
      if (state.user) {
        setFetchAccountError(false)

        try {
          setAccount(await fetchAccount(state.firebase))
        } catch (error) {
          console.error('Error fetching account', error)
          setFetchAccountError(true)
        }
      }
    }

    run()
  }, [state.user])

  const onBackdropPress = () => {
    if (!deleteRequestLoading) {
      setConfirmDeleteDialogOpen(false)
      setDeleteRequestSuccess(false)
      setDeleteRequestError(false)
    }
  }

  const onConfirm = async () => {
    setDeleteRequestLoading(true)
    setDeleteRequestSuccess(false)
    setDeleteRequestError(false)

    const requestDelete = !account?.delete_request_at

    try {
      await deleteAccount(
        state.firebase,
        requestDelete,
      )

      setAccount(prevAcc => ({
        ...prevAcc,
        delete_request_at: requestDelete ? (new Date()).toISOString() : undefined,
      }))
      setDeleteRequestSuccess(true)
    } catch (error) {
      console.error('Error deleting account', error)
      setDeleteRequestError(true)
    }

    setDeleteRequestLoading(false)
  }

  const dialogText = useMemo(() => {
    switch (true) {
      case deleteRequestError:
        return (
          <Text style={{color: 'red'}}>
            {account?.delete_request_at
              ? 'Failed to submit account deletion'
              : 'Failed to cancel account deletion'}
            {'\n'}
            {'\n'}
            Please try again.
          </Text>
        )
      case deleteRequestSuccess:
        return (
          <Text>
            {account?.delete_request_at
              ? 'Account deletion request submitted'
              : 'Account deletion request cancelled'}
          </Text>
        )
      case Boolean(account?.delete_request_at):
        return (
          <Text>
            {'\n'}
            Are you sure you wish to cancel your account deletion request?
            {'\n'}
            {'\n'}
            To proceed with canceling your account deletion request, please click Confirm.
          </Text>
        )
      default:
        return (
          <Text>
            {'\n'}
            Are you sure you want to delete your account?
            {'\n'}
            {'\n'}
            Your account will be deleted after 14 days.
            {'\n'}
            {'\n'}
            If you change your mind, you can cancel your account deletion request during this time.
            {'\n'}
            {'\n'}
            To proceed with deleting your account, please click Confirm.
          </Text>
        )
    }
  }, [account, deleteRequestError, deleteRequestSuccess])

  const dialogTitle = useMemo(() => {
    switch (true) {
      case deleteRequestError:
        return 'AN ERROR OCCURED'
      case deleteRequestSuccess:
        return 'REQUEST SUCCESSFUL'
      case Boolean(account?.delete_request_at):
        return 'CANCEL ACCOUNT DELETION'
      default:
        return 'REQUEST ACCOUNT DELETION'
    }
  }, [account, deleteRequestError, deleteRequestSuccess])

  const dialogIcon = useMemo(() => {
    switch (true) {
      case deleteRequestError:
        return (
          <Image
            source={ErrorIcon}
            style={{height: 20, width: 20, marginRight: 10}}
          />
        )
      case
        deleteRequestSuccess:
        return (
          <Image
            source={SuccessIcon}
            style={{height: 20, width: 20, marginRight: 10}}
          />
        )
      default
        :
        return (
          <Image
            source={WarnIcon}
            style={{height: 20, width: 20, marginRight: 10}}
          />
        )
    }
  }, [deleteRequestSuccess, deleteRequestError])

  const renderDeleteRequestDialog = () => (
    <Dialog
      isVisible={confirmDeleteDialogOpen}
      overlayStyle={classes.dialog}
      onBackdropPress={onBackdropPress}
      animationType='fade'
    >

      <View style={{flex: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          {dialogIcon}
          <Dialog.Title title={dialogTitle} titleStyle={{marginBottom: 0}} />
        </View>
        <View style={classes.dialogTextItem}>
          {dialogText}
        </View>
      </View>
      {deleteRequestSuccess ? (
        <Button
          loading={deleteRequestLoading}
          buttonStyle={classes.dialogButton}
          onPress={onBackdropPress}
        >
          <Text style={{color: 'white'}}>
            Awesome!
          </Text>
        </Button>
      ) : (
        <Button
          loading={deleteRequestLoading}
          buttonStyle={classes.dialogButton}
          onPress={onConfirm}
        >
          <Text style={{color: 'white'}}>
            Confirm
          </Text>
        </Button>
      )}
    </Dialog>
  )

  if (!account) {
    return (
      <>
        {fetchAccountError && (
          <Text style={{color: '#b5432f', textAlign: 'center', marginBottom: 12}}>
            Failed to fetch account details
          </Text>
        )}
        <Button
          type='outline'
          buttonStyle={[classes.deleteButton]}
          disabled
          loading={!fetchAccountError}
        >
          {fetchAccountError && (
            <Text style={{color: 'red'}}>
              Try again
            </Text>
          )}
        </Button>
      </>
    )
  }

  return (
    <>
      {renderDeleteRequestDialog()}
      {account?.delete_request_at && (
        <Text h7 style={{color: '#b5432f', textAlign: 'center', marginBottom: 12}}>
          Your account will be deleted in {formatDistance(
          addDays(Date.parse(account.delete_request_at), 14),
          Date.now(),
        )}
        </Text>
      )}
      <Button
        type='outline'
        buttonStyle={[classes.deleteButton]}
        onPress={() => setConfirmDeleteDialogOpen(true)}
      >
        <Text h7 style={{color: 'red'}}>
          {account?.delete_request_at
            ? 'Cancel deletion request'
            : 'Delete account'}
        </Text>
      </Button>
    </>
  )
}

export default DeleteAccount
