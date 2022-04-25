/**
 * expired.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • serve an HTML error page about the specified token being invalid or expired
 *  • or send back 498 (Token Expired/Invalid) with no response body.
 *
 * Example usage:
 * ```
 *     return res.expired();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badToken: {
 *         description: 'Provided token was expired, invalid, or already used up.',
 *         responseType: 'expired'
 *       }
 *     }
 * ```
 */
module.exports = function custo(data, t) {

  var req = this.req;
  var res = this.res;

  console.log('res=', res.message);

  sails.log.verbose('Ran custo ');
  console.log('data==', data);
  console.log('data==', t);

  return res.send(data.message);


};
