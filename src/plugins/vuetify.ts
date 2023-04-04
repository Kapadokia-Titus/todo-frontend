/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          light: '#212121'
        },
      },
      dark: {
        colors: {
          primary: '#1e1e1e',
          secondary: '#2c211f',
          highlight: '#464646',
          appBar: '#3c3735',
          light: '#fafafa',
        }
      }
    },
  },
})
