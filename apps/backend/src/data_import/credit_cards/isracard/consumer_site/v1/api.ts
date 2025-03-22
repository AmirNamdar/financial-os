import axios, { AxiosInstance } from 'axios';

const COOKIE =
  'bckey=e48996fd-f716-4678-98d0-bc8ce4cbabae; TS01b5255d=0102309784300232430156d1715fa5ec0d91bfa51d3047805ef03d7efd932b621cde9d8b2c64ac536509767ed3e772e46c0c1db002; _cls_v=1a62bb6e-64f4-4f81-921b-b618365b5c26; _cls_s=ebfa0fac-9032-4c86-978e-0c83e51ec673:0; BIGipServerring.isracard.co.il_80=3786254528.20480.0000; TS01a9e229=0102309784f0771bb18d1fdcf0101e7f64a24ab0e441b44022ccd32d963641bb0301495897cd484d91cbf1e136a63adda375c33e01; TS01c5374f=01023097840bf17125658f662d5355fcfe4153d528aeb1fc901b1fd28b5f6f1ba5a728930f1a59d7aeb4513a2291f76f8750f59458; samesite=lax; separation02=; JSESSIONID=0000l03d04FjsIQDMYHIbLFx0pc:-1; TS0172b030=01023097844b590e927a4886c5fd50e3bdcf3c668c884c5ce8cf725bb4dc433b0f339cb4131db23f9cca439a4b679c22f046910545; authentication_shared=CfDJ8G_q3U9NPc5CsDRtexjFvilC3YCnpMFkAJD3we6FkzpN4y0cvFpF_XYHYBoEs5xHGckLS0mN6oroa4U8n9__1pnOYblCdpoA1tPTwmSqLPXgkC2dHt2sWeI4SrCwTUdL-b7mpWwGoaP3XeeI_CbutSsuPUwbVPFB5auWABULONYgxb7cTciM367wG0FTc2xvQQdiVX6uBtXFn1nytjWPtiEMeKBSjTORFVvrzOal9R_IjsZs1P-guabG8lM-sN3woymvef997W3AvtMYT2RhrWlx_nB3kaRPtKz1cYhQOeucrnYCH4rc6ydZcQddGOvI92pMOFidkikH2B0ejnz7vA7kMQJT5bZ63JtgLmGw0ghfYCcRv9_z7WqCvmeQrjM7Q0CoJrdfol5WCSbZGqY1nq-IjGvXkXV_XZThZCCM8I9wgCtIxUwEG6oIJVKUE7ZaFpMGZ2ToEm2YuQTwcn9oTko; TS01cba107=01023097844819c241ad6fea91c848ba01f3878619c440bea2ee4aa79cb08b85bdf0351a4019cde3b54b8c953cd59eb7d51ee5a261; TS01931031=0102309784e8a1b7890f452af80580721b96c4baa5417fc7b6e8d52bcc107b6df8414e549790f2e1751fd4bd1e0ab583981bc3b7a0; TS0113209f=0102309784603e3c0c37e0533b587fd15a8bdc781e7ef2120614df5772e53f8dcdf23d17c7698dc7b79d18230f1cf25176460986c3fbeccc0fce945dc4f483cd4b22a7ca5b; TS01617aac=010230978432f65bf257b95fd35f849979ef2bcdcffabd4f65836d2691cb11e10d8f70221163bbfa80a96616f4b66c8bf2307e900822966b9cbb624728a5872d9842d65b30fdaba84ead3e3dfe163fd4183c335813; TS01ca8b66=0102309784240b9167b56f0f81ded3787b1dc98cd7c7f56d5d59f2fb7f06779f5a814f0a4fda96dc721e5114ac12b32e42bae07da3688d4467bfdcd45b890a23f5bd4083fabe08ee66c14cda61d45bad64c4ddd6097e2f2e0a4df6a8ee4515afc148d42ea1e223b716b505672c93a0f717197f54dfe011116e345783cbdb1bb0e7629b4da3734854fb5ca132f2fed8875491882028';

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

interface IsracardTransactionsResponse {
  isSuccess: boolean;
  errorCode: string;
  israelAbroadVouchers: {
    vouchers: IsracardTransactionVoucher[];
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

    console.log(response.data);

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
