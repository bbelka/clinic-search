const axios = require('axios');


module.exports = {
    search: async (req, res) => {
        try {
            const vetClinics = await axios({
                url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
                method: 'get'
            });
            res.status(200).json(vetClinics.data);
        } catch {
            res.status(500).json({ message: err })
        }
    }
};