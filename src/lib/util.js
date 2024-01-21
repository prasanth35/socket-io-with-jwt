const utils = {
    getTokenSplited : (request) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    return token
    }
}

module.exports = { utils }