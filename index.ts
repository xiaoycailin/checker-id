import axios from "axios";
export interface CodashopResponse {
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

export interface Role {
    server_id: number;
    server: string;
    role_id: number;
    client_type: number;
    role: string;
    player_id: string;
    packed_role_id: number;
}

const gameList = {
    AOV: { id: 270229, price: 5000000.0, gameId: 0, gvtId: 0 },
    CALL_OF_DUTY: { id: 46221, price: 500000.0, gameId: 73, gvtId: 90 },
    FREEFIRE: { id: 20500, price: 1000.0, gameId: 17, gvtId: 33 },
    GENSHIN_IMPACT: { id: 116101, price: 479000.0, gameId: 0, gvtId: 0 },
    IDENTITY_V: { id: 59687, price: 435000.0, gameId: 0, gvtId: 0 },
    WILD_RIFT: { id: 372111, price: 360000.0, gameId: 0, gvtId: 0 },
    NETEASE_LIFEAFTER: { id: 45768, price: 424000.0, gameId: 0, gvtId: 0 },
    LIGHT_OF_THEL
    : { id: 62560, price: 299000.0, gameId: 0, gvtId: 0 },
    MOBILE_LEGENDS: { id: 20355, price: 24254.0, gameId: 0, gvtId: 19 },
    SUPER_SUS: { id: 266144, price: 210000.0, gameId: 0, gvtId: 0 },
    VALORANT: { id: 75194, price: 250000.0, gameId: 0, gvtId: 0 },
    ZULONG_DRAGON_RAJA: { id: 75574, price: 15000.0, gameId: 108, gvtId: 138 },
    HAGO: { id: 20762, price: 1950.0, gameId: 33, gvtId: 43 },
}
export interface GameFace {
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
export class Codashop {

    private static postData(game: GameFace) {
        return {
            'voucherPricePoint.id': game.id,
            'voucherPricePoint.price': game.price,
            'voucherPricePoint.variablePrice': 0,
            'n': '12/7/2022-2031',
            'email': '',
            'userVariablePrice': 0,
            'order.data.profile': 'eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ==',
            'user.userId': game.userData?.userId,
            'user.zoneId': game.userData?.zoneId,
            'msisdn': '',
            'voucherTypeName': game.userData?.gameKey,
            'shopLang': 'id_ID',
            'voucherTypeId': game.gameId,
            'gvtId': game.gvtId,
            'checkoutId': '',
            'affiliateTrackingId': '',
            'impactClickId': '',
            'anonymousId': ''
        }
    }   

    public static get games() {
        return gameList
    }

    public static async request(game: keyof typeof gameList, userId: string, zoneId?: string) {

        const request = await axios.post('https://order-sg.codashop.com/initPayment.action', this.postData({
            gameId: this.games[game].gameId,
            gvtId: this.games[game].gvtId,
            id: this.games[game].id,
            price: this.games[game].price,
            userData: {
                gameKey: game,
                userId: userId,
                zoneId: zoneId
            }
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.codashop.com',
                'Referer': 'https://www.codashop.com/',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Mobile Safari/537.36'
            }
        })

        return request.data as CodashopResponse
    }
}

