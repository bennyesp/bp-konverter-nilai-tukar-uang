type CurrencyProperties = {
    label: string,
    symbol: string,
    isosymbol:string,
}

/**
 * Daftar mata uang di ekstensi ini
 */
const currencies: CurrencyProperties[] = [
    {
        label: "Dolar AS",
        symbol:"US$",
        isosymbol: "USD",
    },
    {
        label: "Euro",
        symbol:"€",
        isosymbol: "EUR"
    },
    {
        label: "Yuan Cina",
        symbol:"CN¥",
        isosymbol: "CNY"
    },
    {
        label: "Rupiah",
        symbol:"Rp",
        isosymbol: "IDR",
    },
    {
        label: "Poundsterling",
        symbol:"£",
        isosymbol: "GBP",
    },
    {
        label: "Yen Jepang",
        symbol:"JP¥",
        isosymbol: "JPY",
    }
];

export {currencies}
export type {CurrencyProperties}