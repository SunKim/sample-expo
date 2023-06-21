// cf) https://docs.expo.dev/guides/localization/
// cf) https://docs.expo.dev/versions/latest/sdk/localization/
// cf) https://medium.com/@nicolas.kovacs/react-native-localize-and-i18n-js-117f09428017
import {getLocales} from 'expo-localization'
import {I18n} from 'i18n-js'

import {en} from '../../locales/en'
import {ko} from '../../locales/ko'
import {inni} from '../../locales/inni'
import {th} from '../../locales/th'

// Set the key-value pairs for the different languages you want to support.
const translations = {en, ko, in: inni, th}
const i18n = new I18n(translations)

i18n.defaultLocale = 'en'

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true

// screen에서 사용시 ex) i18n.t('dict.hello')
// console.log(`Index - i18n.t('dict.hello'): `, i18n.t('dict.hello'))

export default i18n
