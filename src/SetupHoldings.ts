import { parse } from 'papaparse';
import { cloneNode } from '@finsweet/ts-utils';

interface SetupHoldingInterface {
  Date?: string;
  Account?: string;
  StockTicker?: string;
  CUSIP?: string;
  SecurityName: string;
  Shares: string;
  Price?: string;
  MarketValue?: string;
  Weightings: string;
  NetAssets?: string;
  SharesOutstanding?: string;
  CreationUnits?: string;
  MoneyMarketFlag?: string;
}

// The setupHoldings function
export default function setupHolding(url: string): void {
  // DOM wrapper containing the type of holdingTicker. i.e FJNK | FLRT
  const holdingTickerElement = document.querySelector('.etf-sub-1') as HTMLElement;
  // Capture the type of holdingTicker. Text value
  const holdingTickerType = holdingTickerElement.textContent?.split(' ')[1] as string;
  // DOM wrapper for holdings date
  const holdingsDateElement = document.querySelector('.holdings-date') as HTMLElement;
  // DOM Wrapper for holdings Table
  const holdingsTableWrapper = document.querySelector('[holdings]') as HTMLElement;
  // Template for holdings row
  const holdingsRowTemplate = document.querySelector('[holdings] > div:not(.row-4)') as HTMLElement;
  // Clone Template for holdings row
  const newHoldingsRowTemplate = cloneNode(holdingsRowTemplate);
  // Delete the holdings dummy template row
  holdingsRowTemplate.remove();
  // Calling CSV Parser
  //const holdingTickerType = 'FJNK';
  parse(url, {
    download: true,
    complete: function (results) {
      // Fetched / converted data
      const holdingsData = results.data as Array<string>;
      // List to capture holdings record according to the holdings Ticker Type
      const holdingsArr: Array<SetupHoldingInterface> = [];
      holdingsData.forEach((holding) => {
        if (holding[1] === holdingTickerType) {
          //$('.holdings-date').text(holding['Date']);
          const arr: SetupHoldingInterface = {
            Date: holding[0],
            CUSIP: holding[3],
            SecurityName: holding[4],
            Shares: holding[5],
            Weightings: holding[8],
          };
          holdingsArr.push(arr);
        }
      });
      // Count for template switch of color between blue(.row-5) and white(.row-6)
      let colorSwitchCount = 0;
      // Render filtered holdings to DOM
      for (let i = 0; i < holdingsArr.length; i++) {
        if (i === 10) break;
        if (holdingsDateElement.textContent !== holdingsArr[i].Date)
          holdingsDateElement.textContent = String(holdingsArr[i].Date);
        // Create holdings DOM template for data update
        const holdingsTemplate = cloneNode(newHoldingsRowTemplate);
        // update the sucurity col
        const securityName = holdingsTemplate.querySelector('[security]') as HTMLElement;
        securityName.textContent = String(holdingsArr[i].SecurityName);
        // upadate the share col
        const share = holdingsTemplate.querySelector('[share]') as HTMLElement;
        share.textContent = String(holdingsArr[i].Shares);
        // update the weightings col
        const weighting = holdingsTemplate.querySelector('[weighting]') as HTMLElement;
        weighting.textContent = String(holdingsArr[i].Weightings);
        // switch template color
        if (colorSwitchCount === 0) colorSwitchCount += 1;
        else {
          colorSwitchCount -= 1;
          holdingsTemplate.classList.replace('row-5', 'row-6');
        }
        // append to holdings template to main holdings table wrapper
        holdingsTableWrapper.insertAdjacentElement('beforeend', holdingsTemplate);
      }
      // Delete the first cloned template
      newHoldingsRowTemplate.remove();
    },
  });
}
