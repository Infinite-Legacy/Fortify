import React, { useState } from 'react';
import Image from 'next/image';

const TokenInfo: React.FC = () => {

    return (
        <div className='flex flex-col gap-y-2 border-2  border-gray-300 rounded divide-y divide-gray-400'>
            <div className='flex flex-row  h-24 '>
                <div className="m-3 w-20 h-20 rounded">
                    <img
                        src='/images/coin.png'
                        alt="card-image"
                        className="object-cover w-20 h-20 rounded-full"
                    />
                </div>
                <div className="flex flex-col my-3 justify-center items-start h-full">
                    <h2>Safemoon <span>&bull;</span> SAFE</h2>
                    <p>$0.00004</p>
                </div>
                <div></div>
            </div>

            <div className="flex lg:flex-row flex-col px-7 py-4 gap-x-1 justify-center">
                <div className="flex flex-col divide-y w-1/2 h-320 border-2  border-gray-300 rounded p-4">
                    <h2 className="font-bold text-center">Token Market Data</h2>
                    <div className="flex flex-col gap-1 divide-y divide-gray-400 p-2">
                        <div className="font-semibold text-sm flex flex-row justify-between ">
                            <p>Current Price</p>
                            <p>$0.0005</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Market Capitalization</p>
                            <p>$10,000,000</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>24-hour Trading Volume</p>
                            <p>$1,000,000</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Price Change (24h)</p>
                            <p>+5%</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>All-Time High (ATH)</p>
                            <p>$1.00</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>All-Time Low (ATL)</p>
                            <p>$0.0001</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Circulating Supply</p>
                            <p>100,000,000</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Total Supply</p>
                            <p>1,000,000,000</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Fully Diluted Market Cap</p>
                            <p>$100,000,000</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Trading Pairs</p>
                            <p>USDC, SOL</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-1">
                            <p>Liquidity</p>
                            <p>$5,000,000</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col divide-y w-1/2 h-320 border-2  border-gray-300 rounded p-4">
                    <h2 className="font-bold text-center">Security Summary</h2>
                    <div className="flex flex-col gap-1 divide-y divide-gray-400 p-2">
                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Mint Address</p>
                            </div>
                            <p className="text-blue-600">0xZYX..R321</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Creator</p>
                            </div>
                            <p className="text-blue-600">0xZYX..R321</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Mint Authority</p>
                            </div>
                            <p className="text-blue-600">0xZYX..R321</p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Mintable</p>
                            </div>
                            <p className="text-green-600">Yes  <i className="fa fa-check-circle-o" aria-hidden="true"></i></p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Mutable</p>
                            </div>
                            <p className="text-green-600">Yes  <i className="fa fa-check-circle-o" aria-hidden="true"></i></p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Burnt</p>
                            </div>
                            <p className="text-red-700">No  <i className="fa fa-times-circle-o" aria-hidden="true"></i></p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Freezable</p>
                            </div>
                            <p className="text-red-700">No  <i className="fa fa-times-circle-o" aria-hidden="true"></i></p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Ownership Renounced</p>
                            </div>
                            <p className="text-red-700">No  <i className="fa fa-times-circle-o" aria-hidden="true"></i></p>
                        </div>

                        <div className="font-semibold text-sm flex flex-row justify-between pt-2">
                            <div className="flex flex-row gap-1 ">
                                <Image src="/images/forticon.png" alt="Icon" width={16} height={16} />
                                <p>Update Authority</p>
                            </div>
                            <p className="text-blue-600">0xZYX..R321</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col  justify-start px-7 py-4 gap-2">
                <div className="text-left font-extrabold font-24"><h2>AI GPT Agent Insight</h2></div>

                <div className="w-full font-semibold border-2  border-gray-300 rounded">
                    <p className="text-left p-4"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur reiciendis vitae laborum quos corrupti odio eius sed in, cumque suscipit aut ullam debitis, nihil totam adipisci, recusandae maiores? Reprehenderit, voluptatibus!</p>
                </div>
            </div>

        </div>
    )

};

export default TokenInfo;