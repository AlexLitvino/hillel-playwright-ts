import { test, expect } from '@playwright/test';
import { testUser1 } from "../../../test-data/users";

test("Sign In", async ({request}) => {
    const response = await request.post("/api/auth/signin", {data: {
        "email": testUser1.email,
        "password": testUser1.password,
        "remember": false
    }});

    expect(response.status()).toBe(200);
    expect(response.headers()["set-cookie"].split(';')[0]).toContain('sid=');
})


test("Add new car",  async ({request}) => {
    const authResponse = await request.post("/api/auth/signin", {data: {
        "email": testUser1.email,
        "password": testUser1.password,
        "remember": false
    }});
    expect(authResponse.status()).toBe(200);

    const addNewCarResponse = await request.post("/api/cars", {data: {
        "carBrandId": 3,
        "carModelId": 11,
        "mileage": 123
    }});
    console.log(addNewCarResponse);
    expect(addNewCarResponse.status()).toBe(201);
})
