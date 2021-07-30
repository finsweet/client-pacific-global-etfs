import Papa from 'papaparse';

declare global {
  interface Window {
    Papa: typeof Papa;
  }
}

export {};
