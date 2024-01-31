describe ('Get All Category', () => {
    it ('Get All', () => {
        cy.request({
            method: 'GET',
            url: `/products/categories`,
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
})