const express = require('express')
const app = express()

const PTKP = {
    "IDR": {
        "tk": 25,
        "k0": 50,
        "k1": 75
    },
    "VND": {
        "tk": 15,
        "k0": 30
    }
}

const TAX_RATE = {
    "IDR": [
        {
            "layer": 50,
            "rate": 0.05
        },
        {
            "layer": 250,
            "rate": 0.1
        },
        {
            "layer": null,
            "rate": 0.15
        }
    ],
    "VND": [
        {
            "layer": 50,
            "rate": 0.025
        },
        {
            "layer": null,
            "rate": 0.07
        }
    ]
}

app.post('/hitunggaji', (req, res) => {
    const employee = req.body.employee
    const komponengaji = req.body.komponengaji

    let penghasilanBruto = 0
    for (let i = 0; i < komponengaji.length; i++) {
        penghasilanBruto += komponengaji[i].amount
    }

    let penghasilanNetto = 0
    let pajak = 0
    let asuransi = 0
    if (employee.country === "ID") {
        penghasilanNetto = penghasilanBruto - (PTKP.IDR[employee.marital_status] * 1000000)

        for (let i = 0; i < TAX_RATE.IDR.length; i++) {
            if (TAX_RATE.IDR[i].layer === null || penghasilanNetto <= TAX_RATE.IDR[i].layer * 1000000) {
                pajak += (penghasilanNetto * TAX_RATE.IDR[i].rate)
                break
            } else {
                pajak += (TAX_RATE.IDR[i].layer * 1000000 * TAX_RATE.IDR[i].rate)
                penghasilanNetto -= (TAX_RATE.IDR[i].layer * 1000000)
            }
        }
    } else if (employee.country === "VN") {
        asuransi = penghasilanBruto * 0.1
        penghasilanNetto = penghasilanBruto - asuransi - (PTKP.VND[employee.marital_status] * 1000000)

        for (let i = 0; i < TAX_RATE.VND.length; i++) {
            if (TAX_RATE.VND[i].layer === null || penghasilanNetto <= TAX_RATE.VND[i].layer * 1000000)

            {
                pajak += (penghasilanNetto * TAX_RATE.VND[i].rate)
                break
                } else {
                pajak += (TAX_RATE.VND[i].layer * 1000000 * TAX_RATE.VND[i].rate)
                penghasilanNetto -= (TAX_RATE.VND[i].layer * 1000000)
                }
                }
                }

const gaji = {
    "penghasilanBruto": penghasilanBruto,
    "asuransi": asuransi,
    "penghasilanNetto": penghasilanNetto,
    "pajak": pajak,
    "gajiDiterima": penghasilanNetto - pajak
    }
                
    res.json({
        "gaji": gaji
        })
    })


    app.listen(8080, () => {
        console.log('Payroll app listening on port 8080!')
        })
                
