import AddScoreDialog from '../../../src/components/dialogs/AddScoreDialog.vue'

describe('<AddScoreDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddScoreDialog)
  })
})