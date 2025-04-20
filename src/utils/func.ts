/**
 * Memformat angka sesuai dengan format Indonesia.
 * @param {number} x - Angka yang akan diformat
 * @param {number} decimals - Jumlah angka di belakang koma
 * @param {boolean} curr - Aktivasi format sebagai Rupiah 
 * @param {boolean} forceToZero - Memaksa pemformatan angka desimal menjadi 0 angka di belakang koma saat diformat sebagai mata uang
 * @returns {String} Angka yang sudah diformat
 */
const formatNumber = (x:number, decimals:number = 0, curr: boolean=false, forceToZero: boolean = false) : string => {
    if(curr && !forceToZero) decimals = 2;
    const y: string = x.toLocaleString('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
    return (curr)?`Rp${y}`:y;
}

/**
 * Mengecek apakah sebuah variabel, objek, atau array bernilai kosong
 * @param {unknown} x - Variabel bertipe data apapun, objek, atau array
 * @returns {boolean} Kosong atau berisi
 */
const isBlank = (x: unknown): boolean => {
    return (
        x === null || x === undefined || (typeof x === "string" && !x.trim()) || (typeof x === "object" && !Array.isArray(x) && Object.keys(x as object).length === 0) || (Array.isArray(x) && x.length === 0)
    );
};

/**
 * Memeriksa apakah sebuah angka memiliki nilai desimal kecil (kurang dari 0,01)
 * @param {number} num Angka yang akan dicek
 * @returns {boolean} Pernyataan apakah benar atau salah jika angkat tersebut desimalnya kurang dari 0,01
 */
const lowDecimalCheck = (num: number): boolean => {
    const decimalPart = num % 1;
    const decimalStr = num.toString().split('.')[1];
  
    return (
      decimalPart > 0 &&
      decimalPart < 0.01 &&
      !!decimalStr &&
      decimalStr.length > 2
    );
}

export {formatNumber, isBlank, lowDecimalCheck}