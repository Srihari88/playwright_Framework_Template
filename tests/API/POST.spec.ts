import {expect,test} from '@playwright/test'

test.describe('',()=>{

   const baseURL=`https://reqres.in`

   test(' GET Response',async({request})=>{

    const response = await request.get(`${baseURL}/api/users?page=2`)
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text());
    const headers=response.headers()
    console.log(headers)
    console.log(responseBody)
    expect(responseBody.page).toBe(2)
    expect(responseBody.per_page).toBe(6)
    expect(responseBody.total).toBe(12)
    expect(responseBody.total_pages).toBe(2)
    expect(responseBody.data[0].email).toBe('michael.lawson@reqres.in')
    expect(responseBody).toHaveProperty('page')
    expect(responseBody).toHaveProperty('per_page')
    expect(responseBody).toHaveProperty('total_pages')

   })


})