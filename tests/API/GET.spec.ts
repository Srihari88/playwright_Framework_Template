// @ts-check

import { expect, test } from '@playwright/test'

const postdata={
    "name": "morpheus",
    "job": "leader"
}

test.describe('API Test', () => {

    const baseURL = `https://reqres.in`

    test(' GET API Testing', async ({ request }) => {
        const response = await request.get(`${baseURL}/api/users?page=2`)
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody)
        expect(responseBody.page).toBe(2)
        expect(responseBody.per_page).toBe(6)
        expect(responseBody.total).toBe(12)
        expect(responseBody.total_pages).toBe(2)
    })


    test(` POST Request`, async ({ request }) => {
        const response = await request.post(`${baseURL}/api/users`, {data:postdata})
        expect(response.status()).toBe(201)
        const responseBody=JSON.parse(await response.text())
        console.log(responseBody)
        console.log("my Body response:",response.body())
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.name).toBe('morpheus')
        expect(responseBody.job).toBe('leader')

    })

})