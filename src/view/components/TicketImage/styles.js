import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  ticketImage: ratio => ({
    borderRadius: 8,
    width: '100%',
    resizeMode: 'contain',
    aspectRatio: ratio,
  }),
  ticketImageSkeleton: {
    borderRadius: 8,
    height: 114,
  },
  pdfButton: {
    backgroundColor: theme.palette.common.yellow500,
    marginTop: 50,
  },
  buttonsContainer: hasTicketType => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: hasTicketType ? 'center' : 'space-between',
  }),
  dialog: {
    width: '80%',
    padding: 18,
  },
}))
