const { GoogleSpreadsheet } = require('google-spreadsheet');
let dataCache = {};
exports.handler = async (event, context) => {
    


    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
    const auth = await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
    });


    const info = await doc.loadInfo(); // loads document properties and worksheets


    const totalsByYearSheet = doc.sheetsByTitle['TotalsByYear'];
    const rows = await totalsByYearSheet.getRows(); // can pass in { limit, offset }
    const totalsByYear = rows.map(r => {
        let { Year, NM, Hours, SingleHandedMiles } = r;
        NM = Math.round(NM);
        SingleHandedMiles = Math.round(SingleHandedMiles);
        Hours = Math.round(Hours);
        return { Year, NM, Hours, SingleHandedMiles };
    });
    

    const totalsByBoatSheet = doc.sheetsByTitle['TotalsByBoat'];
    const boatRows = await totalsByBoatSheet.getRows(); // can pass in { limit, offset }
    const totalsByBoat = boatRows.map(r => {
        console.log(r);
        let { Name, Boat, NM, LOA, Type, Description, Image } = r;
        NM = Math.round(NM);
        return { Boat, NM, LOA, Type, Boat, Description, Image };
    });
    

    return {
        statusCode: 200,
        body: JSON.stringify({
            totalsByYear,
            totalsByBoat
        })
    }
}
