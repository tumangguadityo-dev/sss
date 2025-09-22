'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [totalBNB, setTotalBNB] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/count')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setTotalBNB(data.totalBNB);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>BNB Transfer Counter</h1>
      <p>Total BNB sent from 0xbf310C4060c5399BE02B51f07850BAFF91269179 to 0x28816c4C4792467390C90e5B426F198570E29307:</p>
      <h2>{totalBNB} BNB</h2>
    </div>
  );
}
