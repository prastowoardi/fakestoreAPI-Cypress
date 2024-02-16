import { faker } from '@faker-js/faker'
import { generateRandomId } from "../../support/randomValue"

function getRandomDate(startDate, endDate) {
    const startTimestamp = new Date(startDate).getTime()
    const endTimestamp = new Date(endDate).getTime()
    const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp)
    return new Date(randomTimestamp).toISOString().split('T')[0]
}
const startDate = '2019-01-01'
const endDate = '2020-12-31'

const date = getRandomDate(startDate, endDate)

describe('Edit Cart', () => {
    it('Edit Cart', () => {
        const id = generateRandomId()
        cy.request({
            method: 'POST',
            url: '/carts',
            body: {
                userId: id,
                date: date,
                products: [
                    {
                        productId:id,
                        quantity:faker.number.int(10)
                    },
                    {
                        productId:id,
                        quantity:faker.number.int(10)
                    }
                ]
            },
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            switch (response.status) {
                case 200:
                    expect(response.status).to.eq(200)
                    console.log(response.body)

                    cy.log('User ID: ' + response.body.userId)
                    cy.log(`Product: ${JSON.stringify(response.body.products)}`)
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
