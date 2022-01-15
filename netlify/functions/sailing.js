const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  const auth = await doc.useServiceAccountAuth({
    client_email : process.env.GOOGLE_CLIENT_EMAIL,
    private_key : process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  }); 
  

  const info = await doc.loadInfo(); // loads document properties and worksheets
  
  
  const totalsByYearSheet = doc.sheetsByTitle['TotalsByYear'];
  const rows = await totalsByYearSheet.getRows(); // can pass in { limit, offset }
  const totalsByYear = rows.map(r => {
    const { Year, NM, Hours, PercentSailed, SingleHandedMiles } = r;
    return { Year, NM, Hours, PercentSailed, SingleHandedMiles };
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      totalsByYear
    })
  }
}

exports.handler()
