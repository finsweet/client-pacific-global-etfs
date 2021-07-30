import { cloneNode } from '@finsweet/ts-utils';

interface SetupHoldingInterface {
  Date: string;
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
  window.Papa.parse<string>(url, {
    download: true,
    complete: ({ data }) => {
      // List to capture holdings record according to the holdings Ticker Type
      const holdingsArr: Array<SetupHoldingInterface> = [];

      data.forEach(([Date, Account, , CUSIP, SecurityName, Shares, , , Weightings]) => {
        if (Account === holdingTickerType) {
          holdingsArr.push({
            Date,
            CUSIP,
            SecurityName,
            Shares,
            Weightings,
          });
        }
      });

      // Count for template switch of color between blue(.row-5) and white(.row-6)
      let colorSwitchCount = 0;

      // Render filtered holdings to DOM
      for (const [index, { Date, SecurityName, Shares, Weightings }] of holdingsArr.entries()) {
        if (index === 10) break;

        if (holdingsDateElement.textContent !== Date) holdingsDateElement.textContent = Date;

        // Create holdings DOM template for data update
        const holdingsTemplate = cloneNode(newHoldingsRowTemplate);

        // update the sucurity col
        const securityName = holdingsTemplate.querySelector('[security]') as HTMLElement;
        securityName.textContent = SecurityName;

        // upadate the share col
        const share = holdingsTemplate.querySelector('[share]') as HTMLElement;
        share.textContent = Shares;

        // update the weightings col
        const weighting = holdingsTemplate.querySelector('[weighting]') as HTMLElement;
        weighting.textContent = Weightings;

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
