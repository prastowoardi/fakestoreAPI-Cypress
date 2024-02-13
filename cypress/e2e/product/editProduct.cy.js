import { faker } from "@faker-js/faker"

function generateRandomId() {
    return Math.floor(Math.random() * 10) + 1
}

var id = generateRandomId()

function generateCategory(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error('Invalid input: Please provide a non-empty array.')
    }

    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

describe ('Delete Product', () => {
    it ('Delete Product', () => {
        const categories = ["electronics", "jewelery", "men's clothing", "women's  clothing"]
        const randomCategories = generateCategory(categories)

        cy.request({
            method: 'PUT',
            url: `/products/${id}`,
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