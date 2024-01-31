describe ('Get All Carts', () => {
    it ('Get All', () => {
        cy.request({
            method: 'GET',
            url: `/carts`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 200) {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                console.log(response.body)
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

    function generateRandomId() {
        return Math.floor(Math.random() * 10) + 1
    }
    
    var id = generateRandomId()

    it('Get One Cart', () => {
        cy.request({
            method: 'GET',
            url: `/carts/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            const cart = response.body

            if (cart && Object.prototype.hasOwnProperty.call(cart, 'products')) {
                cy.log(`User ID: ${cart.userId}`)
                cy.log(`Date: ${cart.date}`)

                // Ambil products dadri array
                cart.products.forEach((product) => {
                    cy.log(`Product ID: ${product.productId}`)
                    cy.log(`Quantity: ${product.quantity}`)
                })

                console.log(response.body)
            } else {
                throw new Error('Cart data not found')
            }
        })
    })


    function getRandomDate(startDate, endDate) {
        const startTimestamp = new Date(startDate).getTime()
        const endTimestamp = new Date(endDate).getTime()
        const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp)
        return new Date(randomTimestamp).toISOString().split('T')[0]
    }
    
    it('Get carts with a random date range', () => {
        const startDate = '2019-01-01'
        const endDate = '2020-12-31'
    
        const randomStartDate = getRandomDate(startDate, endDate)
        const randomEndDate = getRandomDate(randomStartDate, endDate)
    
        if (new Date(randomEndDate) < new Date(randomStartDate)) {
            cy.log('End date cannot be earlier than start date.')
            return
        }

        cy.request({
            method: 'GET',
            url: `/carts?startdate=${randomStartDate}&enddate=${randomEndDate}`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            const carts = response.body
    
            if (carts.length === 0) {
                throw new Error(`No products found in cart for the specified date range: ${randomStartDate} to ${randomEndDate}`)
            } else {
                carts.forEach((cart) => {
                    cy.log(`User ID: ${cart.userId}`)
                    cy.log(`Date: ${cart.date}`)
                })

                console.log(response.body)
            }
        })
    })                 
})