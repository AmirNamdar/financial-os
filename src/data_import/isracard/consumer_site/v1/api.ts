import axios, { AxiosInstance } from 'axios';

const COOKIE =
  'bckey=e48996fd-f716-4678-98d0-bc8ce4cbabae; TS01b5255d=0102309784300232430156d1715fa5ec0d91bfa51d3047805ef03d7efd932b621cde9d8b2c64ac536509767ed3e772e46c0c1db002; _cls_v=1a62bb6e-64f4-4f81-921b-b618365b5c26; _cls_s=ebfa0fac-9032-4c86-978e-0c83e51ec673:0; BIGipServerring.isracard.co.il_80=3786254528.20480.0000; TS01a9e229=0102309784f0771bb18d1fdcf0101e7f64a24ab0e441b44022ccd32d963641bb0301495897cd484d91cbf1e136a63adda375c33e01; TS01c5374f=01023097840bf17125658f662d5355fcfe4153d528aeb1fc901b1fd28b5f6f1ba5a728930f1a59d7aeb4513a2291f76f8750f59458; samesite=lax; JSESSIONID=0000l03d04FjsIQDMYHIbLFx0pc:-1; TS0172b030=01023097844b590e927a4886c5fd50e3bdcf3c668c884c5ce8cf725bb4dc433b0f339cb4131db23f9cca439a4b679c22f046910545; authentication_shared=CfDJ8G_q3U9NPc5CsDRtexjFvinoLYr7teMnjlUccauMxPCg1ep3-dit3lAeHRU4WoHgFEEAqpJNrOzE9pt1w5koHr2gELMZR0KHAliqJ0nrQOkITdEEkuWYwftxeEeu1wcDvwLkjGOp5inY50WS7XsfCO2orBM0WWFaP7UQu4GOi2iMvcdy9jsZyquIl6ETWZbT9P4gORz_fjUbLiC5fsB8gVc8xpnB3P1ERMAuueutsOQ_4XhnYB7hH0k1kyzhhAt1z4_3HPw5su9yTV_pqukES9YxkemMk5zfOSVh53MsrAGqWRi0IVz43P6Rwd7CQJilztoWfqOm_-XA1XCTjrrXj6qZno9mRGnWfUD4hzO7opto19S-5COqx4Wcpr2349XwkzqwbP2_i9r5cFZUV4HBMkFj12hVR1aBvFzvOirZZRi1uKodxovE52PCx-IqRpmxrs1HoyqMr_5_KuRlsrtbqho; TS01cba107=0102309784b2f1d78bddd5427b87275cf88e27b149a69862b97e7c9c2f4ae01e6bb732d67daa1586928ccc23f683115c703d77ef89; TS01931031=010230978449746509d3263f5c744cf8fc74316cbf6d3c15823a9a14fad6924147306396f80d23028779f61874c8dbafcb55d540ea; TS0113209f=010230978486f89cfdfecb4b05a48660be1ea749eadbd090be450a8fb63e3bca1b3b5c8e7128f4166a8f8adf068337bc774786d9b5367323fe32b1083a2228ea4d26825fca; TS01617aac=0102309784413919fea5979d0c79963590ec03ee99cdb4a152ca540f9f8efe763f1acb00e621732bad72a7706a5e235c56f0053f1d50e1be511b39745d9b2649d30e7a4688708a723ff6ef48012ee348bd1c35076a; TS01ca8b66=0102309784e17c87c8257f08cef61e7b9fc7e2adbec7f56d5d59f2fb7f06779f5a814f0a4fda96dc721e5114ac12b32e42bae07da321dbc60aad20469e20b973677750184f586db80738f8f0849ca5836e68ed6841fa2331682bbbf7f2985f2838d97813dd5fc0f36bae0f2898e4a59649790b7165e64385fc9073341ac21e720aea282c4d124ec097ddd1cf3a6aeaad164a976d70';

export interface IsracardTransactionVoucher {
  billingAmountCurrencySymbol: string;
  billingAmountCurrency: number;
  isIsraelDeal: boolean;
  purchaseDate: string;
  purchaseTime: string;
  transactionCode: number;
  transactionDescription: string;
  businessName: string;
  clearedCode: string;
  clearedDescription: string;
  cityDescription: string;
  countryCode: string;
  countryDescription: string;
  originalAmount: number;
  originalCurrencyIso: string;
  ilsAmount: number;
  billingAmount: number;
  usdAmount: number | null;
  moreInfo: string;
  tranzacCodeType: string;
  tranzacCodeDescription: string;
  presentCard: boolean;
  isTransactionSecure: boolean;
  isWalletTransaction: boolean;
  isdirectDebit: boolean;
  isNewDirectDebit: boolean | null;
  isLastInstallment: boolean | null;
  currentInstallmentNum: number | null;
  numberOfInstallment: number | null;
  voucherNumber: number;
  seqVoucherNumber: string;
  businessNumber: number;
  discountIndication: boolean;
  discountAmount: number | null;
  discountClubName: string | null;
}

export interface IsracardTransactionsResponse {
  isSuccess: boolean;
  errorCode: string;
  israelAbroadVouchers: {
    vouchers: {
      israelAbroadVouchersList: IsracardTransactionVoucher[];
    };
  };
}

const createIsracardClient = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://web.isracard.co.il',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type': 'application/json',
      DNT: '1',
      Origin: 'https://web.isracard.co.il',
      Referer: 'https://web.isracard.co.il/transactions',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      Cookie: COOKIE,
    },
    withCredentials: true,
  });
};

export class IsracardConsumerSiteV1Api {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = createIsracardClient();
  }

  async getMonthlyTransactionsReport(
    cardDetails: { last4Digits: number; companyCode: number },
    billingMonth: string,
  ): Promise<IsracardTransactionsResponse> {
    const payload = {
      billingMonth,
      card4Number: cardDetails.last4Digits.toString(),
      isNextBillingDate: true,
      cardStatus: 0,
      companyCode: cardDetails.companyCode,
      isPartner: false,
    };
    const response = await this.client.post<IsracardTransactionsResponse>(
      '/DigitalV3.Transactions/GetTransactionsList',
      payload,
    );

    if (response.data.isSuccess === false && response.data.errorCode === '22') {
      throw new ExpiredIsracardSessionError();
    }

    // @ts-ignore
    return response.data.data;
  }
}

class ExpiredIsracardSessionError extends Error {
  constructor() {
    super('Isracard session has expired');
    this.name = 'ExpiredIsracardSessionError';
  }
}
