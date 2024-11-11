import { useEffect, useState } from 'react';

function useCurrency(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://api.exchangerate-api.com/v4/latest/${currency}`
                );

                if (!res.ok) {
                    throw new Error(`API returned status: ${res.status}`);
                }

                const result = await res.json();
                setData(result.rates);
                console.log(result.rates);
            } catch (error) {
                console.error('Error fetching currency data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, [currency]);

    return data;
}

export default useCurrency;
