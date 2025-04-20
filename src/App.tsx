import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import { currencies, CurrencyProperties } from './utils/config';
import { formatNumber, lowDecimalCheck } from './utils/func';
// import { useHotkeys } from 'react-hotkeys-hook';

const App = () => {
  const defaultAsal: string = "USD";
  const defaultTujuan: string = "IDR";
  const [asal, setAsal] = useState<string>(defaultAsal);
  const [tujuan, setTujuan] = useState<string>(defaultTujuan);
  const [nilaiAsal, setNilaiAsal] = useState<string>("0");
  const [notification, setNotification] = useState<string>("");
  const [result, setResult] = useState<ReactNode>(<></>);

  // const nilaiAsalRef = useRef<HTMLInputElement>(null);
  // const asalDropdown = useRef<HTMLSelectElement>(null);
  // const tujuanDropdown = useRef<HTMLSelectElement>(null)
  /**
   * Mengambil data mata uang asal dan tujuan yang
   * digunakan dalam konversi sebelumnya.
   * Data disimpan di dalam local storage chrome.
   * Jika ada, maka akan dilakukan set variabel untuk
   * state asal dan tujuan.
   */
  const latestCurrencyGetter = () => {
    chrome.runtime.sendMessage(
      {
        type: "GET_LATEST_CURRS",
      },
      (res) => {
        if(res.asal || res.tujuan) {
          setAsal(res.asal);
          setTujuan(res.tujuan);
        }
      }
    );
  }
  // useHotkeys("ctrl+k", (e) => {
  //   e.preventDefault();
  //   nilaiAsalRef.current?.focus();
  // });

  // useHotkeys("ctrl+shift+d", (e) => {
  //   e.preventDefault();
  //   asalDropdown.current?.focus();

  //   const event = new MouseEvent("mousedown", {
  //     bubbles: true,
  //     cancelable: true,
  //     view: window,
  //   });
  //   asalDropdown.current?.dispatchEvent(event);
  // });

  useEffect(() => {
    
    latestCurrencyGetter();
  }, [])
  /**
   * Menukar mata uang asal dengan mata uang tujuan
   */
  const currencySwapper = ():void => {
    setNotification("");
    const newAsal: string = tujuan;
    setTujuan(asal);
    setAsal(newAsal);
  }
  /**
   * Menyimpan pilihan mata uang dalam konversi terakhir.
   */
  const currOptSaver = (): void => {
    chrome.runtime.sendMessage(
      {
        type: "SET_LATEST_CURRS",
        data: { asal, tujuan },
      },
      (res) => {
        console.log("Sudah tersimpan: ", res);
      }
    );
  };
  /**
   * Handling untuk submit form konversi.
   * @param {FormEvent<HTMLFormEvent>} e Event submit dari formulir. 
   */
  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    setNotification("");
    chrome.runtime.sendMessage(
      {
        type: "GET_RATE",
        asal, tujuan
      },
      (res) => {
        try{
          const numberNilaiAsal = Number(nilaiAsal);
          const hasil: number | string = numberNilaiAsal * res.rate;
          const desimal: number = lowDecimalCheck(hasil) ? 3 : 2;
          setResult(
            <>
              <div className="result-line mb-1">{(():string =>{
                const selectedCurrency: CurrencyProperties | undefined = currencies.find((currency) => currency.isosymbol === asal);
                return selectedCurrency?.symbol || "";
              })()} {formatNumber(Number(nilaiAsal), (():number => lowDecimalCheck(Number(nilaiAsal)) ? 3 : 2)())} =</div>
              <div className="result-line text-xl font-bold">{(():string =>{
                const selectedCurrency: CurrencyProperties | undefined = currencies.find((currency) => currency.isosymbol === tujuan);
                return selectedCurrency?.symbol || "";
              })()} {formatNumber(hasil, desimal)}</div>
              <div className="text-xs mt-4">Sumber data = {res.source}</div>
            </>
          )
        }
        catch(e){
          setResult(<>
            <p>Error dalam mengambil data nilai tukar</p>
          </>);
          console.log(e);
        }
      }
    )
  }
  return (
    <>
      <h1 className='text-xl'>BP - Konverter Mata Uang</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Mata uang</legend>
          <div className="flex-fieldset flex flex-row gap-3">
            <div className="field">
              <div className="inner-field-container flex flex-col">
                <label htmlFor="asal">Mata uang asal</label>
                <div className="super-inner-field-container flex flex-row">
                  <select className="text-sm px-4 py-2 outline-none border-r border-gray-300" name="asal" value={asal} id="asal" onChange={(e:ChangeEvent<HTMLSelectElement>) => {
                    setNotification("");
                    const asalSymbol = e.target.value;
                    if (asalSymbol === tujuan) {setNotification("Mata uang asal dan tujuan tidak boleh sama!");}
                    else {setAsal(asalSymbol);currOptSaver();}
                  }}>
                    {currencies.map((currency: CurrencyProperties) => (
                      <option value={currency.isosymbol}>{currency.label}</option>
                    ))}
                  </select>
                  <input type="text" className="text-sm px-4 py-2 outline-none w-32 border rounded" name="nilaiAsal" id="nilaiAsal" value={nilaiAsal} placeholder="Masukkan angka" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const input = e.target.value;
                      if (/^[0-9]*\.?[0-9]*$/.test(input)) {
                        setNilaiAsal(input);
                      }
                    }}
                  />
                  <img className="currency-swapper cursor-pointer w-7" src='swap-svgrepo-com.svg' alt="currency swapper" onClick={currencySwapper} />
                </div>
              </div>
              <div className="inner-field-container flex flex-col">
                <label htmlFor="tujuan">Mata uang tujuan</label>
                <select className='text-sm px-4 py-2 outline-none w-32' name="tujuan" id="tujuan" value={tujuan} onChange={(e:ChangeEvent<HTMLSelectElement>) => {
                    setNotification("");
                    const tujuanSymbol = e.target.value;
                    if (tujuanSymbol === asal) {setNotification("Mata uang asal dan tujuan tidak boleh sama!");}
                    else{ setTujuan(tujuanSymbol);currOptSaver();}
                  }}>
                  {currencies.map((currency: CurrencyProperties) => (
                    <option value={currency.isosymbol}>{currency.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className='px-3 py-2 rounded-sm bg-button1 text-button1 hover:bg-button1hover hover:text-button1hover'>Konversikan</button>
        </fieldset>
        { notification && (
          <div className="notification">
            {notification}
          </div>
        )
        }
      </form>
      { result && (
        <div className="result px-3 py-4 flex flex-col justify-center items-center">
          {result}
        </div>
      )}
    </>
  )
}

export default App;
