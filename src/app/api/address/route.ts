import { gql, GraphQLClient } from "graphql-request";
import { Connection, PublicKey } from "@solana/web3.js";
import { OpenOrders } from "@project-serum/serum";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { DasApiAsset, DasApiAssetInfo } from "@/lib/type";
import { ShyftSdk, Network } from "@shyft-to/js";

interface ExtendedDasApiAsset extends DasApiAsset {
  // Add the token_info property
  token_info: DasApiAssetInfo;
}

const rpc =
  "https://mainnet.helius-rpc.com/?api-key=90abe477-bdbe-4add-af28-800bf2ca2e04";
// for dev purposes only. will move to .env after testing. This is helius

// RPC endpoint for connecting to Solana network for shyft

const rpcEndpoint = "https://rpc.shyft.to?api_key=DSKXJdx3MYH_3TNP";

// Define the GraphQL endpoint URL for liquidity pool data
const lpEndpoint =
  "https://programs.shyft.to/v0/graphql/?api_key=DSKXJdx3MYH_3TNP&network=mainnet-beta";
// Define the GraphQL endpoint URL for whirlpools data
const whirlpoolsEndpoint =
  "https://programs.shyft.to/v0/graphql?api_key=DSKXJdx3MYH_3TNP&network=mainnet-beta";

const umi = createUmi(rpc).use(dasApi());

// Create a GraphQL client instance for liquidity pool data
const lpGraphQLClient = new GraphQLClient(lpEndpoint, {
  method: "POST",
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});

// Create a GraphQL client instance for whirlpools data
const whirlpoolsGraphQLClient = new GraphQLClient(whirlpoolsEndpoint, {
  method: "POST",
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});

// get Address and process

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const body = await req.json();

      const { address } = body;

      // important fxn for entire call process

      const responseData = (await processLpQueryResult(
        address
      )) as ExtendedDasApiAsset;

      return new Response(JSON.stringify(responseData));
    } catch (error) {
      console.log(error, "Failure to get Address data from FrontEnd!");
    }
    // Return an error response
    return new Response(JSON.stringify({ error: "Failed to get Data" }));
  } else {
    // Return a 405 Method Not Allowed response if the method is not POST
    return new Response(JSON.stringify({ error: "Method not allowed" }));
  }
}

//Initialize gQL Client

async function queryLpByOneAddress(token: any) {
  // Get all proposalsV2 accounts
  const query = gql`
    query MyQuery($where: Raydium_LiquidityPoolv4_bool_exp) {
      Raydium_LiquidityPoolv4(where: $where) {
        _updatedAt
        baseDecimal
        baseLotSize
        baseMint
        baseNeedTakePnl
        baseTotalPnl
        baseVault
        depth
        lpMint
        lpReserve
        lpVault
        marketId
        marketProgramId
        nonce
        openOrders
        quoteLotSize
        quoteMint
        quoteNeedTakePnl
        quoteTotalPnl
        quoteVault
        swapQuote2BaseFee
        swapQuoteInAmount
        swapQuoteOutAmount
        pubkey
      }
    }
  `;

  const variables = {
    where: {
      baseMint: {
        _eq: token,
      },
    },
  };

  return lpGraphQLClient.request(query, variables);
}

async function processLpQueryResult(token: any) {
  const lpData: any = await queryLpByOneAddress(token);
  const liquidityPools = lpData.Raydium_LiquidityPoolv4;
  const pubKeys = liquidityPools.map((pool: any) => pool.pubkey);

  // Fetch liquidity data
  const totalLiquidityValue = await fetchLiqFunction(pubKeys);

  // Get token data
  const tokenData = await getFirstData(token);

  // Construct response data object
  const responseData: any = {
    tokenData: tokenData,
    totalLiquidityValue: totalLiquidityValue,
  };

  return responseData;
}

// UMI instance

async function getFirstData(token: any) {
  try {
    const responseData = await fetch(rpc, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAsset",
        params: {
          id: token,
          displayOptions: {
            showFungible: true,
          },
        },
      }),
    });
    const { result } = await responseData.json();

    const { id, mutable, burnt } = result;
    const { name, description, token_standard, symbol } =
      result.content.metadata;
    const tokenImage = result.content.links;
    const creatorAddress = result.creators[0]?.address;
    const uA = result.authorities[0]?.address;
    const scopes = result.authorities[0]?.scopes;
    const ownerRenounced = result.ownership.delegated;

    // Calculate supply and fdmc
    const supply: any =
      result.token_info.supply / 10 ** result.token_info.decimals;

    const decimals = result.token_info.decimals;
    const price = result.token_info.price_info.price_per_token;
    const fdmc = price * supply;

    // Construct token data object
    const tokenData = {
      id: id,
      mutable: mutable,
      burnt: burnt,
      tokenName: name,
      description: description,
      tokenStandard: token_standard,
      tokenSymbol: symbol,
      tokenImage: tokenImage,
      creatorAddress: creatorAddress,
      uA: uA,
      scopes: scopes,
      ownerRenounced: ownerRenounced,
      supply: supply,
      decimals: decimals,
      price: price,
      // currency: currency,
      fdmc: fdmc,
    };

    // console.log("tokenDataFinal:", tokenData);
    return tokenData;
  } catch (error) {
    console.log(error, "Failure to get data");
    throw error;
  }
}

async function fetchLiqFunction(pubKeys: string[]) {
  //  Define the GraphQL query
  try {
    const promises = pubKeys.map(async (pubKey) => {
      const query = gql`
        query GetLiquidityPoolByAddress($address: String!) {
          Raydium_LiquidityPoolv4(where: { pubkey: { _eq: $address } }) {
            baseDecimal
            baseMint
            lpMint
            lpReserve
            baseNeedTakePnl
            baseVault
            marketId
            marketProgramId
            openOrders
            quoteDecimal
            quoteMint
            quoteNeedTakePnl
            quoteVault
          }
        }
      `;

      const variables = { address: pubKey };

      return lpGraphQLClient.request(query, variables);
    });

    const poolInfo: any = await Promise.all(promises);

    const totalLiq = await parsePoolInfo(
      poolInfo.map((pool: any) => pool.Raydium_LiquidityPoolv4)
    );

    return totalLiq;
  } catch (error) {
    console.error("Error fetching liquidity pool data for main:", error);
    throw error;
  }
}

// Function to parse pool information

async function parsePoolInfo(poolInfos: any[]) {
  try {
    let totalLiquidityValue = 0;

    // Loop through each pool info
    for (const poolInfo of poolInfos) {
      // Extract poolData from poolInfo
      const poolData = poolInfo;

      const poolDataItem = poolData[0];

      // Proceed with processing the valid poolDataItem
      const OPENBOOK_PROGRAM_ID = new PublicKey(
        "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
      );

      // Connect to Solana network
      const connection = new Connection(rpcEndpoint, "confirmed");

      const openOrders = await OpenOrders.load(
        connection,
        new PublicKey(poolDataItem.openOrders),
        OPENBOOK_PROGRAM_ID
      );

      // Calculate base and quote token amounts
      const baseDecimal = 10 ** poolDataItem.baseDecimal;
      const quoteDecimal = 10 ** poolDataItem.quoteDecimal;

      const baseTokenAmount = await connection.getTokenAccountBalance(
        new PublicKey(poolDataItem.baseVault)
      );
      const quoteTokenAmount = await connection.getTokenAccountBalance(
        new PublicKey(poolDataItem.quoteVault)
      );

      const baseMint = poolDataItem.baseMint;
      const quoteMint = poolDataItem.quoteMint;

      const basePnl = poolDataItem.baseNeedTakePnl / baseDecimal;
      const quotePnl = poolDataItem.quoteNeedTakePnl / quoteDecimal;

      const openOrdersBaseTokenTotal = openOrders.baseTokenTotal / baseDecimal;
      const openOrdersQuoteTokenTotal =
        openOrders.quoteTokenTotal / quoteDecimal;

      // Calculate pool totals
      const base =
        (baseTokenAmount.value?.uiAmount || 0) +
        openOrdersBaseTokenTotal -
        basePnl;
      const quote =
        (quoteTokenAmount.value?.uiAmount || 0) +
        openOrdersQuoteTokenTotal -
        quotePnl;

      // UMI 2 Calculations
      const getBaseDetails = async (baseMint: string, totalBase: number) => {
        try {
          const tokenAddyB = publicKey(baseMint);

          const responseData = await fetch(rpc, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: "my-id",
              method: "getAsset",
              params: {
                id: tokenAddyB,
                displayOptions: {
                  showFungible: true,
                },
              },
            }),
          });
          const { result } = await responseData.json();

          const responseDataB = await result;

          const priceB = responseDataB.token_info.price_info.price_per_token;

          const totalLiqB = totalBase * priceB;

          return { totalLiqB }; // Return an object with totalLiqB
        } catch (error) {
          console.log(error, "Failure to get data of Base");
          throw error;
        }
      };

      const getQuoteDetails = async (quoteMint: string, totalquote: number) => {
        try {
          const tokenAddyQ = publicKey(quoteMint);

          const responseData = await fetch(rpc, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: "my-id",
              method: "getAsset",
              params: {
                id: tokenAddyQ,
                displayOptions: {
                  showFungible: true,
                },
              },
            }),
          });

          const { result } = await responseData.json();

          const responseDataQ = await result;

          const priceQ = responseDataQ.token_info.price_info.price_per_token;

          const totalLiqQ = totalquote * priceQ;

          return { totalLiqQ };
        } catch (error) {
          console.log(error, "Failure to get data");
          throw error;
        }
      };

      const totalLiquidity = async (
        baseMint: string,
        base: number,
        quoteMint: string,
        quote: number
      ) => {
        try {
          const [baseDetails, quoteDetails] = await Promise.all([
            getBaseDetails(baseMint, base),
            getQuoteDetails(quoteMint, quote),
          ]);
          const totalLiqB = baseDetails.totalLiqB;
          const totalLiqQ = quoteDetails.totalLiqQ;

          const totalLiquidityValue = totalLiqB + totalLiqQ;

          return totalLiquidityValue;
        } catch (error) {
          console.error(error, "Failed to calculate total liquidity");
          throw error;
        }
      };

      const totalValueLiq = async () => {
        const liquidityValue = await totalLiquidity(
          baseMint,
          base,
          quoteMint,
          quote
        );

        totalLiquidityValue += liquidityValue;

        const totalLiq = totalLiquidityValue;

        return totalLiq;
      };

      const totalLiq = totalValueLiq();

      return totalLiq;
    }
  } catch (error) {
    console.error("Error fetching liquidity pool data for refinement:", error);
    throw error;
  }
}
