import { generateRandomId } from "../../support/randomValue"
import { generateCategory } from "../../support/randomValue"

const id = generateRandomId()
describe ('Get All product', () => {
    it ('Get All', () => {
        cy.request({
            method: 'GET',
            url: `/products`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 200) {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            } else if (response.status === 400 || response.status === 401) {
                expect(response.status).to.eq(400) || expect(response.status).to.eq(401)
                let message = JSON.stringify(response.body.message)
                throw new Error(`ID : ${id}, ${message}`)
            } else if (response.status === 500) {
                expect(response.status).to.eq(500)
                throw new Error('Server Error')
            }
        })
    })

    it('Get One Product', () => {
        cy.request({
            method: 'GET',
            url: `/products/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            const product = response.body

            if (product && Object.prototype.hasOwnProperty.call(product, 'title')) {
                cy.log(`Product Name: ${product.title}`)
                cy.log(`Price: ${product.price}`)
                cy.log(`Category: ${product.category}`)    
                // Additional check for rating property
                if (product.rating) {
                    cy.log(`Rating: ${product.rating.rate} (Count: ${product.rating.count})`)
                }
            } else {
                throw new Error('Product data not found')
            }
        })
    }) 

    it('Get products in a specific category', () => {
    
        const categories = ["electronics","jewelery","men's clothing","women's  clothing", "jacket"]
        const randomCategories = generateCategory(categories)

        cy.request({
            method: 'GET',
            url: `/products/category/${randomCategories}`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            const products = response.body

            if (products && products.length > 0) {
                cy.log('Products found:', products)
                products.forEach((productInCategory) => {
                    cy.log(`Poduct Name : ${productInCategory.title}`)

                })
                console.log('products:', products)
            } else {
                cy.log('Data not found:', JSON.stringify(products))
                throw new Error('Product data not found')
            }
        })
    })        
})