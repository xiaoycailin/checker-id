const axios = require("axios")

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

class Codashop {

    static postData(game) {
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

    static get games() {
        return gameList
    }

    static async request(game, userId, zoneId) {

        const req = await axios.post('https://order-sg.codashop.com/initPayment.action', this.postData({
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

        if (req.data.success) {
            const response1 = JSON.parse(decodeURIComponent(req.data.result))?.username
            const response2 = JSON.parse(decodeURIComponent(req.data.result))?.roles

            let finalResponse = { username: '', game: game.replaceAll('_', ' ') }
            if (response1 !== undefined || response1 === null) {
                finalResponse.username = decodeURI(response1).replaceAll('+', ' ')
            } else if (response2.length !== 0) {
                finalResponse.username = decodeURI(response2[0].role).replaceAll('+', ' ')
            } else {
                finalResponse.username = ''
            }
            return ({
                success: true,
                data: finalResponse,
                codaResponse: req.data
            })
        } else {
            let message = req.errorMsg
            if (req.RESULT_CODE === 10001) {
                message = "Terlalu banyak aksi, Silahkan coba lagi setelah 5 detik"
            } else {
                message = req.errorMsg
            }

            if (!req.errorMsg) message = "Permintaan tidak valid"
            return ({
                success: false,
                message,
                data: req.data
            })
        }
    }
}
module.exports = { Codashop }
