import { IsracardConsumerSiteV1Api, IsracardTransactionVoucher } from './api';

type CardDetails = {
  last4Digits: number;
  companyCode: number;
};

const MY_CARDS: CardDetails[] = [
  {
    last4Digits: 3303,
    companyCode: 11,
  },
  {
    last4Digits: 9931,
    companyCode: 77,
  },
  {
    last4Digits: 3304,
    companyCode: 77,
  },
];

const GAL_CARDS: CardDetails[] = [];

const _ALL_CARDS = [...MY_CARDS, ...GAL_CARDS];

const api = new IsracardConsumerSiteV1Api();

async function getTransactionsForMonth(
  api: IsracardConsumerSiteV1Api,
  cardDetails: CardDetails,
  month: number,
  year: number,
): Promise<IsracardTransactionVoucher[]> {
  try {
    const dateStr = `01/${String(month).padStart(2, '0')}/${String(year)}`;
    const response = await api.getMonthlyTransactionsReport(cardDetails, dateStr);

    if (response['israelAbroadVouchers'] == null) {
      return [];
    }

    const vouchers = response['israelAbroadVouchers']['vouchers']['israelAbroadVouchersList'];

    return vouchers;
  } catch (error) {
    console.error(
      `Error fetching transactions for card ${cardDetails.last4Digits} on ${month}/${year}:`,
      error,
    );
    return [];
  }
}

async function getAllTransactions(): Promise<IsracardTransactionVoucher[]> {
  const allTransactions: IsracardTransactionVoucher[] = [];

  // Generate dates for the last n years
  const today = new Date();
  const twoYearsAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1);

  for (const cardDetails of MY_CARDS) {
    console.log(`Fetching transactions for card ${cardDetails.last4Digits}...`);

    let currentDate = new Date(twoYearsAgo);
    while (currentDate <= today) {
      console.log(
        `Fetching transactions for ${currentDate.getMonth() + 1}/${currentDate.getFullYear()}...`,
      );

      const transactions = await getTransactionsForMonth(
        api,
        cardDetails,
        currentDate.getMonth() + 1,
        currentDate.getFullYear(),
      );
      allTransactions.push(...transactions);

      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);

      // Add a small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return allTransactions;
}

async function run() {
  //   const transactions = await getTransactionsForMonth(api, ALL_CARDS[0], 1, 2025);
  const transactions = await getAllTransactions();

  console.log(`Total transactions collected: ${transactions.length}`);
  console.log('Sample transactions:', transactions.slice(0, 5));
}

run();
