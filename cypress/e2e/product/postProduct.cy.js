import { faker } from '@faker-js/faker'
import { generateCategory } from "../../support/randomValue"

describe('Create menu', () => {
    it('Create Menu', () => {
        const categories = ["electronics", "jewelery", "men's clothing", "women's  clothing"]
        const randomCategories = generateCategory(categories)

        cy.request({
            method: 'POST',
            url: '/products',
            body: {
                title: faker.commerce.productName(),
                price: faker.number.int(100),
                description: faker.commerce.productDescription(),
                image: faker.image.url(),
                category: randomCategories,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            switch (response.status) {
                case 200:
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                    break
                case 400:
                case 401:
                    expect(response.status).to.satisfy((code) => code === 400 || code === 401)
                    let message = JSON.stringify(response.body.message)
                    throw new Error(`${message}`)
                case 500:
                    expect(response.status).to.eq(500)
                    throw new Error('Server Error')
                default:
                    throw new Error(`Unexpected status code: ${response.status}`)
            }
        })
    })
})
