import GameCard from '../../../src/components/cards/GameCard.vue'

describe('<GameCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(GameCard)
  })
})