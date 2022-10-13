import { defaultTheme } from '../styles/theme/default'
import 'styled-components'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  // eslint-disable-next-line prettier/prettier
  export interface DefaultTheme extends ThemeType { }
}
