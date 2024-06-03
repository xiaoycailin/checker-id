
declare const gameList: {
    AOV: { id: number, price: number, gameId: number, gvtId: number },
    CALL_OF_DUTY: { id: 46221, price: number, gameId: number, gvtId: number },
    FREEFIRE: { id: number, price: number, gameId: number, gvtId: number },
    GENSHIN_IMPACT: { id: number, price: number, gameId: number, gvtId: number },
    IDENTITY_V: { id: number, price: number, gameId: number, gvtId: number },
    WILD_RIFT: { id: number, price: number, gameId: number, gvtId: number },
    NETEASE_LIFEAFTER: { id: number, price: number, gameId: number, gvtId: number },
    LIGHT_OF_THEL
    : { id: number, price: number, gameId: number, gvtId: number },
    MOBILE_LEGENDS: { id: number, price: number, gameId: number, gvtId: number },
    SUPER_SUS: { id: number, price: number, gameId: number, gvtId: number },
    VALORANT: { id: number, price: number, gameId: number, gvtId: number },
    ZULONG_DRAGON_RAJA: { id: number, price: number, gameId: number, gvtId: number },
    HAGO: { id: number, price: number, gameId: number, gvtId: number },
}

declare interface CodashopResponse {
    initCallBackendAPI: boolean;
    orderId: string;
    errorCode: string;
    confirmation: boolean;
    isUserConfirmation: boolean;
    errorMsg: string;
    paymentChannel: string;
    result: string;
    channelPrice: string;
    confirmationFields: {
        zipCode: string;
        country: string;
        totalPrice: string;
        create_role_country: string;
        userIdAndZoneId: string;
        userId: string;
        productName: string;
        paymentChannel: string;
        this_login_country: string;
        channelPrice: string;
        price: string;
        zoneId: string;
        verifiedMsisdn: string;
        priceBeforeTax: string;
        taxAmount: string;
        email: string;
        inputRoleId: string;
        username: string;
    };
    success: boolean;
    denom: string;
    user: {
        userId: string;
        zoneId: string;
    };
    RESULT_CODE: number;
    isThirdPartyMerchant: boolean;
    txnId: string;
}

export declare interface GameResponse {
    success: boolean
    message?: string
    data?: { username: string; game: keyof typeof gameList } | CodashopResponse,
    codaResponse?: CodashopResponse
}
export declare interface Role {
    server_id: number;
    server: string;
    role_id: number;
    client_type: number;
    role: string;
    player_id: string;
    packed_role_id: number;
}
export declare interface GameFace {
    id: string | number;
    price: string | number;
    gameId: string | number;
    gvtId: string | number;
    userData?: {
        userId: string;
        zoneId?: string;
        gameKey: keyof typeof gameList;
    };
    [key: string]: any;
}
export declare class Codashop {

    private static postData(game: GameFace): any

    public static get games(): typeof gameList

    public static request(game: keyof typeof gameList, userId: string, zoneId?: string): Promise<GameResponse>
}