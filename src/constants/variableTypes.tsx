export type NFTTokenProps = {
    name: string;
};

export type NFTCardProps = {
    nft: any;
    onClickCard: any;
};

export type SearchProps = {
    searchNFT: any;
};

export type NFTModalProps = {
    nft: any;
    owners: string[];
    onCloseModal: any;
}