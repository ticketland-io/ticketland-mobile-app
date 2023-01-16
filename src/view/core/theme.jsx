import {createTheme} from '@rneui/themed'

const colors = {
  black: '#000000',
  white: '#ffffff',
  darkGray: '#0B0C0E',
  gray97: '#F8F8F8',
  gray98: '#FAFAFA',
  gray100: '#F2F2F3',
  gray200: '#C9CACC',
  gray300: '#A8A9AC',
  gray400: '#7E8186',
  gray500: '#3D434F',
  gray600: '#373C47',
  gray700: '#2F343D',
  gray800: '#272A32',
  gray900: '#1B1E23',
  yellow: '#F4E300',
  yellow100: '#FFFCE4',
  yellow200: '#FFF8C6',
  yellow300: '#FFF4A1',
  yellow400: '#FFF172',
  yellow500: '#FFED00',
  yellow600: '#E4D400',
  yellow700: '#C6B800',
  yellow800: '#A19600',
  yellow900: '#726A00',
  errorLight: '#F2AFA4',
  error: '#E24A30',
  red: '#E24A30',
  red100: '#b5432f',
  green100: '#60b563'
}

export const getTheme = () => createTheme({
  palette: {
    type: 'light',
    text: {
      primary: colors.black,
      secondary: colors.yellow500
    },
    primary: {
      main: colors.yellow500
    },
    secondary: {
      main: colors.yellow500
    },
    background: {
      paper: colors.white,
      body: colors.white
    },
    common: {
      ...colors
    }
  },
})
