import { Nullable, PublicKey } from '@metaplex-foundation/umi';
export declare type GetAssetsByAuthorityRpcInput = {
    /**
     * The address of the authority of the assets.
     */
    authority: PublicKey;
} & Pagination;
export declare type GetAssetsByCreatorRpcInput = {
    /**
     * The address of the creator of the assets.
     */
    creator: PublicKey;
    /**
     * Indicates whether to retrieve only verified assets or not.
     */
    onlyVerified: boolean;
} & Pagination;
export declare type GetAssetsByGroupRpcInput = {
    /**
     * The key of the group (e.g., `"collection"`).
     */
    groupKey: DasApiPropGroupKey;
    /**
     * The value of the group
     */
    groupValue: string;
} & Pagination;
export declare type GetAssetsByOwnerRpcInput = {
    /**
     * The address of the owner of the assets.
     */
    owner: PublicKey;
} & Pagination;
export declare type SearchAssetsRpcInput = {
    /**
     * Indicates whether the search criteria should be inverted or not.
     */
    negate?: Nullable<boolean>;
    /**
     * Indicates whether to retrieve all or any asset that matches the search criteria.
     */
    conditionType?: Nullable<'all' | 'any'>;
    /**
     * The interface value of the asset.
     */
    interface?: Nullable<DasApiAssetInterface>;
    /**
     * The value for the JSON URI.
     */
    jsonUri?: Nullable<string>;
    /**
     * The address of the owner.
     */
    owner?: Nullable<PublicKey>;
    /**
     * Type of ownership.
     */
    ownerType?: Nullable<'single' | 'token'>;
    /**
     * The address of the creator.
     */
    creator?: Nullable<PublicKey>;
    /**
     * Indicates whether the creator must be verified or not.
     */
    creatorVerified?: Nullable<boolean>;
    /**
     * The address of the authority.
     */
    authority?: Nullable<PublicKey>;
    /**
     * The grouping (`key`, `value`) pair.
     */
    grouping?: Nullable<[string, string]>;
    /**
     * The address of the delegate.
     */
    delegate?: Nullable<PublicKey>;
    /**
     * Indicates whether the asset is frozen or not.
     */
    frozen?: Nullable<boolean>;
    /**
     * The supply of the asset.
     */
    supply?: Nullable<number>;
    /**
     * The address of the supply mint.
     */
    supplyMint?: Nullable<PublicKey>;
    /**
     * Indicates whether the asset is compressed or not.
     */
    compressed?: Nullable<boolean>;
    /**
     * Indicates whether the asset is compressible or not.
     */
    compressible?: Nullable<boolean>;
    /**
     * Type of royalty.
     */
    royaltyModel?: Nullable<'creators' | 'fanout' | 'single'>;
    /**
     * The target address for royalties.
     */
    royaltyTarget?: Nullable<PublicKey>;
    /**
     * The royalties amount.
     */
    royaltyAmount?: Nullable<number>;
    /**
     * Indicates whether the asset is burnt or not.
     */
    burnt?: Nullable<boolean>;
} & Pagination;
/**
 * Representation of an asset.
 */
export declare type DasApiAsset = {
    /**
     * The asset interface.
     */
    interface: DasApiAssetInterface;
    /**
     * The asset Id.
     */
    id: PublicKey;
    /**
     * The asset content.
     */
    content: DasApiAssetContent;
    /**
     * List of authorities.
     */
    authorities: Array<DasApiAssetAuthority>;
    /**
     * Compression information.
     */
    compression: DasApiAssetCompression;
    /**
     * Grouping information.
     */
    grouping: Array<DasApiAssetGrouping>;
    /**
     * Royalty information.
     */
    royalty: DasApiAssetRoyalty;
    /**
     * List of creators.
     */
    creators: Array<DasApiAssetCreator>;
    /**
     * Ownership information.
     */
    ownership: DasApiAssetOwnership;
    /**
     * Uses information.
     */
    uses?: DasApiUses;
    /**
     * Supply information.
     */
    supply: DasApiAssetSupply;
    /**
     * Indicates whether the asset's metadata is mutable or not.
     */
    mutable: boolean;
    /**
     * Indicates whether the asset is burnt or not.
     */
    burnt: boolean;

    token_info: DasApiAssetInfo;
};

interface ExtendedDasApiAsset extends DasApiAsset {
    // Add the token_info property
    token_info: DasApiAssetInfo;
  }
/**
 * Representation of a list of assets.
 */
export declare type DasApiAssetList = {
    /**
     * total number of assets in the list.
     */
    total: number;
    /**
     * Limit of assets used to create the list. When the `total` value is
     * lower than the `limit`, it means that there are no more assets to be
     * retrieved.
     */
    limit: number;
    /**
     * Listing of individual assets.
     */
    items: Array<DasApiAsset>;
    /**
     * Additional information about the list.
     */
    [key: string]: unknown;
};
/**
 * Definition of the pagination parameters.
 */
declare type Pagination = {
    /**
     * Sorting criteria.
     */
    sortBy?: Nullable<DasApiParamAssetSortBy>;
    /**
     * The maximum number of assets to retrieve.
     */
    limit?: Nullable<number>;
    /**
     * The index of the `"page"` to retrieve. The first page has index `1`.
     */
    page?: Nullable<number>;
    /**
     * Retrieve assets before the specified `ID` value.
     */
    before?: Nullable<string>;
    /**
     * Retrieve assets after the specified `ID` value.
     */
    after?: Nullable<string>;
};
/**
 * Sorting criteria.
 */
declare type DasApiParamAssetSortBy = {
    sortBy: 'created' | 'updated' | 'recent_action' | 'none';
    sortDirection: 'asc' | 'desc';
};
export declare type DasApiAssetInterface = 'V1_NFT' | 'V1_PRINT' | 'LEGACY_NFT' | 'V2_NFT' | 'FungibleAsset' | 'Custom' | 'Identity' | 'Executable' | 'ProgrammableNFT';
export declare type DasApiAssetContent = {
    json_uri: string;
    files?: Array<{
        uri?: string;
        mime?: string;
        [key: string]: unknown;
    }>;
    metadata: DasApiMetadata;
    links?: Array<{
        [key: string]: unknown;
    }>;
};
export declare type DasApiAssetAuthority = {
    address: PublicKey;
    scopes: DasApiAuthorityScope[];
};
export declare type DasApiAssetCompression = {
    eligible: boolean;
    compressed: boolean;
    data_hash: PublicKey;
    creator_hash: PublicKey;
    asset_hash: PublicKey;
    tree: PublicKey;
    seq: number;
    leaf_id: number;
};
export declare type DasApiAssetOwnership = {
    frozen: boolean;
    delegated: boolean;
    delegate: PublicKey | null;
    ownership_model: 'single' | 'token';
    owner: PublicKey;
};

export declare type DasApiAssetInfo = {
    symbol: string;
    supply: number;
    decimals: 6;
    token_program: string;
    price_info: DasApiAssetPriceInfo;
};

export declare type DasApiAssetPriceInfo = {
   price_per_token: number;
   currency: string
};



export declare type DasApiAssetSupply = {
    print_max_supply: number;
    print_current_supply: number;
    edition_nonce: number | null;
};
export declare type DasApiAssetRoyalty = {
    royalty_model: 'creators' | 'fanout' | 'single';
    target: PublicKey | null;
    percent: number;
    basis_points: number;
    primary_sale_happened: boolean;
    locked: boolean;
};
export declare type DasApiAssetCreator = {
    address: PublicKey;
    share: number;
    verified: boolean;
};
export declare type DasApiPropGroupKey = 'collection';
export declare type DasApiAssetGrouping = {
    group_key: DasApiPropGroupKey;
    group_value: string;
};
export declare type DasApiAuthorityScope = 'full' | 'royalty' | 'metadata' | 'extension';
export declare type DasApiMetadata = {
    name: string;
    symbol: string;
    description?: string;
    token_standard?: string;
    attributes?: Array<{
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    }>;
    [key: string]: unknown;
};
export declare type DasApiUses = {
    use_method: 'burn' | 'multiple' | 'single';
    remaining: number;
    total: number;
};
export declare type GetAssetProofRpcResponse = {
    root: PublicKey;
    proof: PublicKey[];
    node_index: number;
    leaf: PublicKey;
    tree_id: PublicKey;
};
export {};
