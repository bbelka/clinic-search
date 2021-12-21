const axios = require('axios');
const states = require('us-state-converter');


module.exports = {
    search: async ({ query }, res) => {

        //declare results array
        let results = new Array;

        try {

            //get vetCinics
            const vetClinics = await axios({
                url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
                method: 'get'
            });
            //add vetClinics to results array
            vetClinics.data.forEach(clinic => results.push(clinic))

            //get dentalClinics
            const dentalClinics = await axios({
                url: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
                method: 'get'
            });
            //add dentalClinics to results array
            dentalClinics.data.forEach(clinic => results.push(clinic))

            //if name query parameter, filter data by name
            if (query.name) {

                results = results.filter(clinic => {

                    //each data set has different property names, so seperate filters for each dataset
                    //correct for capitalization differences
                    if (clinic.hasOwnProperty('name')) return clinic.name.toLowerCase().includes(query.name.toLowerCase());
                    if (clinic.hasOwnProperty('clinicName')) return clinic.clinicName.toLowerCase().includes(query.name.toLowerCase());
                });
            };

            //if state query parameter, filter data by state
            if (query.state) {

                //standardize query state parameter
                //utilize npm us-state-converter to standardize USPS abbreviaton or full-text state name to USPS abbrreviation
                const state = states(query.state).usps;

                //filter results
                results =

                    results.filter(clinic => {

                        //each data set has different property names, so seperate filters for each dataset
                        if (clinic.hasOwnProperty('stateCode')) {
                            const clinicState = states(clinic.stateCode).usps;
                            return clinicState === state;
                        };
                        if (clinic.hasOwnProperty('stateName')) {
                            const clinicState = states(clinic.stateName).usps;
                            return clinicState === state;
                        };
                    });
            };

            //if from query parameter, filter data by from 
            if (query.from) {
                results = results.filter(clinic => {

                    //each data set has different property names, so seperate filters for each dataset
                    if (clinic.hasOwnProperty('availability') && clinic.availability.hasOwnProperty('from')) {
                        return clinic.availability.from <= query.from;
                    };
                    if (clinic.hasOwnProperty('opening') && clinic.opening.hasOwnProperty('from')) {
                        return clinic.opening.from <= query.from;
                    };
                });
            };

            //if to query parameter, filter data by to 
            if (query.to) {
                results = results.filter(clinic => {

                    //each data set has different property names, so seperate filters for each dataset
                    if (clinic.hasOwnProperty('availability') && clinic.availability.hasOwnProperty('to')) {
                        return clinic.availability.to >= query.to;
                    };
                    if (clinic.hasOwnProperty('opening') && clinic.opening.hasOwnProperty('to')) {
                        return clinic.opening.to >= query.to;
                    };
                });
            };

            res.status(200).json({ data: results });
        } catch (err) {
            res.status(500).json({ message: err });
        }

    }
};

//dates must be 24 hr as string
