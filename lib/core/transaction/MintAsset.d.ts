import { Asset } from "../Asset";
import { AssetScheme, H160, H256, PlatformAddress } from "../classes";
import { AssetTransaction, Transaction } from "../Transaction";
import { NetworkId } from "../types";
import { AssetMintOutput } from "./AssetMintOutput";
export declare class MintAsset extends Transaction implements AssetTransaction {
    private readonly _transaction;
    private readonly approvals;
    constructor(input: {
        networkId: NetworkId;
        shardId: number;
        metadata: string;
        output: AssetMintOutput;
        approver: PlatformAddress | null;
        administrator: PlatformAddress | null;
        allowedScriptHashes: H160[];
        approvals: string[];
    });
    /**
     * Get the tracker of an AssetMintTransaction.
     * @returns A transaction tracker.
     */
    tracker(): H256;
    output(): AssetMintOutput;
    /**
     * Get the output of this transaction.
     * @returns An Asset.
     */
    getMintedAsset(): Asset;
    /**
     * Get the asset scheme of this transaction.
     * @return An AssetScheme.
     */
    getAssetScheme(): AssetScheme;
    /**
     * Get the asset type of the output.
     * @returns An asset type which is H160.
     */
    getAssetType(): H160;
    /**
     * Get the asset address of the output.
     * @returns An asset address which is H256.
     */
    getAssetAddress(): H256;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): any;
}