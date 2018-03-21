const jwt = require('jwt-simple')
const default_config = {
	encode_algo: 'HS256',
}

module.exports = function jwtExpired (config) {
	config = config || {}
	config['encode_algo'] = config.encode_algo || default_config.encode_algo

	function encode (payload, secret_key) {
		secret_key = secret_key || config.secret_key
		payload['createdAt'] = Date.now()
		return jwt.encode(payload, secret_key, config.encode_algo)
	}

	function decode (token, secret_key) {
		secret_key = secret_key || config.secret_key
		return jwt.decode(token, secret_key, false, config.encode_algo)
	}

	function expired(token, secret_key) {
		let payload = decode(token, secret_key)

		if ( ! payload.expSecs ) {
			return false
		}

		return Date.now() >= payload.createdAt + payload.expSecs * 1000
	}

	return {
		expired,
		encode,
		decode,
		jwt,
	}
}