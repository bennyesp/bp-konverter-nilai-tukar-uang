import { access_key } from "./key.js";

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_popup") {
    chrome.action.openPopup().catch(err => console.error(err));
  }
});

/**
 * Mengambil data rate dari exchangerate.host
 * @param {String} asal Mata uang asal, berisi singkatan 3 huruf (misalnya Dolar AS - USD)
 * @param {String} tujuan Mata uang tujuan, berisi singkatan 3 huruf (misalnya Rupiah - IDR)
 * @returns {object | null} Nilai tukar antara kedua mata uang, atau null jika tidak ditemukan atau terjadi error
 */
const fetchRate = async (asal, tujuan) => {
    let pairKey = `${asal}${tujuan}`;
    const today = new Date().toISOString().split("T")[0];

    const stored = await chrome.storage.local.get("pairs");
    let pairs = stored.pairs || {};
    const saved = pairs[pairKey];
    
    if (saved && saved.update?.startsWith(today)) {
      return { rate: saved.rate, source: "cache (api.exchangerate.host)", reversed: saved.reversed };
    }
    try {
      const res = await fetch(`https://api.exchangerate.host/live?access_key=${access_key}&source=${asal}&currencies=${tujuan}&format=1`);
      const data = await res.json();
      let reversed = false;
      pairKey = data?.quotes?.[pairKey] ? pairKey : (() => {
        reversed = true;
        return `${tujuan}${asal}`
      })();
      return data?.quotes?.[pairKey] ? (async () => {
        const newPairData = {
            update: today,
            rate: data?.quotes?.[pairKey],
            reversed
        };
        pairs[pairKey] = newPairData;
        await chrome.storage.local.set({pairs});
        return {rate: data.quotes[pairKey], reversed, source: "direct (api.exchangerate.host)"}
      })() : null;
    } catch (e) {
      console.log(e);
      return null;
    }
};

/**
 * mengambil data opsi mata uang terakhir dari local storage
 * @returns {String} Opsi mata uang terakhir
 */
const dataGetter = async () => {
  const stored = await chrome.storage.local.get("currLastSelected");
  return stored.currLastSelected || {};
}
/**
 * Menyimpan data opsi mata uang terakhir
 * @param {object} data Data mata uang terakhir
 */
const dataSetter = async (data) => {
  const stored = await chrome.storage.local.get("currLastSelected");
  const lastSelected = stored.currLastSelected || {};

  const updated = {
    ...lastSelected,
    ...data,
  };

  await chrome.storage.local.set({ currLastSelected: updated });
}

chrome.runtime.onMessage.addListener((msg, sender, res) => {
  const msgHandlers = [
    { type: "OPEN_EXT",
      action: () => chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup"
      })
    },
    {
      type: "GET_RATE",
      action: () => fetchRate(msg.asal, msg.tujuan).then((result) => res(result))
    },
    { type: "GET_LATEST_CURRS",
      action: () => dataGetter().then((result) => res(result))
    },
    { 
      type: "SET_LATEST_CURRS",
      action: () => dataSetter(msg.data).then(() => res({ success: true }))
    }
  ]
  const scenario = msgHandlers.find(h => h.type === msg.type);
    if(scenario && typeof scenario.action === 'function'){
      scenario.action();
      return true;
    }
    // if(msg.type === "GET_RATE") {
    //   fetchRate(msg.asal, msg.tujuan).then((result) => {
    //       res(result);
    //   });
    //   return true;
    // }
    // else if (msg.type === "GET_LATEST_CURRS"){
    //   dataGetter().then((result) => {
    //     res(result)
    //   });
    //   return true;
    // }
    // else if (msg.type === "SET_LATEST_CURRS"){
    //   dataSetter(msg.data).then(() => {
    //     res({ success: true });
    //   });
    //   return true;
    // }
    // else if (msg.type === "OPENEXT") {
    //   chrome.action.openPopup();
    // }
});