export async function GET(req) {
  try {
    const response = await fetch(
      `https://api.bscscan.com/api?module=account&action=txlist&address=0xbf310C4060c5399BE02B51f07850BAFF91269179&startblock=0&endblock=99999999&page=1&offset=5000&sort=asc&apikey=${process.env.BSCSCAN_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== '1') {
      return new Response(JSON.stringify({ error: 'BscScan API error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let totalBNB = 0;
    const transactions = data.result || [];
    transactions.forEach(tx => {
      if (tx.to.toLowerCase() === '0x28816c4C4792467390c90e5b426f198570e29307' && tx.value !== '0') {
        totalBNB += parseInt(tx.value) / 1e18;
      }
    });

    return new Response(JSON.stringify({ totalBNB: totalBNB.toFixed(6) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
