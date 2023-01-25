const express = require('express')
const app = express()

const catalog = {
    "Proris": ["ibuprofen"],
    "Paratusin": ["paracetamol", "pseudoepedrid", "noscapine", "ctm", "guafenisin", "succus liquiritae", "ethanol"],
    "Panadol": ["paracetamol"],
    "Neurofen": ["ibuprofen", "paracetamol"],
    "Bodrex": ["paracetamol"]
}

app.post('/validasialergiobat', (req, res) => {
    const patient = req.body.pasien
    const prescriptions = req.body.resep

    const patientAllergies = patient.allergies
    const problematicPrescriptions = prescriptions.filter((prescription) => {
        return prescription.kandungan.some((kandungan) => patientAllergies.includes(kandungan))
    })

    res.json({
        "resep": problematicPrescriptions
    })
})

app.listen(8080, () => {
    console.log('Allergy detector app listening on port 8080!')
})
