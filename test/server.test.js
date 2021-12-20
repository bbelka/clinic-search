const { expect } = require("@jest/globals");
const axios = require('axios');
const supertest = require("supertest");
const app = require('../server');


test('Testing to see if Jest is working', () => {
    expect(1).toBe(1)
})

test('No search parameters returns all clinics', async () => {
    const vetClinics = await axios({
        url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
        method: 'get'
    });
    const dentalClinics = await axios({
        url: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
        method: 'get'
    });
    const results = new Array;
    vetClinics.data.forEach(clinic => results.push(clinic));
    dentalClinics.data.forEach(clinic => results.push(clinic));
    await supertest(app).get('/api/clinic')
        .expect(200)
        .then((response) => {
            expect(response.body.data).toStrictEqual(results);
        });
});

test('Inputing only name parameter returns results filtered by name', async () => {
    await supertest(app).get('/api/clinic?name=Mayo%Clinic')
        .expect(200)
        .then((response) => {
            response.body.data.forEach(clinic => {
                expect(clinic.name || clinic.clinicName).toBe('Mayo Clinic')
            })
        });
});

test('Inputing only a state name parameter returns results filtered by state name', async () => {
    await supertest(app).get('/api/clinic?state=California')
        .expect(200)
        .then((response) => {
            response.body.data.forEach(clinic => {
                if (clinic.stateName) { expect(clinic.stateName).toBe('California') }
                else { expect(clinic.stateCode).toBe('CA') };
            })
        });
});

test('Inputing only abbreviated state parameter returns results filtered by state name', async () => {
    await supertest(app).get('/api/clinic?state=CA')
        .expect(200)
        .then((response) => {
            response.body.data.forEach(clinic => {
                if (clinic.stateName) { expect(clinic.stateName).toBe('California') }
                else { expect(clinic.stateCode).toBe('CA') };
            })
        });
});