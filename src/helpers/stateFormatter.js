/**
 * Format the state and extend it as it's not recursive with unistore
 * @param  {Object} state
 * @param  {String} key
 * @param  {Object} value
 * @return {Object}       new state
 * @function
 */
export const toState = (state, key, value) => ({ [key]: { ...state[key], ...value } });

/**
 * Format the state and extends using the dot notation.
 * @param {Object} state - the state to update
 * @param {string|string[]} extendedKey - the key to update in the state. It can be either a string, either a list of string.
 * If it's a string, it corresponds to a path, the `.` separates the keys. If it's an array, each element is a key.
 * @param {Object} value - the updated value.
 * @returns {Object} new state.
 * @example
 * > extended(
 *     {
 *         a: 1,
 *         b: {
 *             c: {
 *                 d: 2,
 *                 e: 3
 *             },
 *             f: {
 *                 g: 4
 *             }
 *         }
 *     },
 *     'b.c',
 *     { d: 42, f: 25 }
 * );
 * // returns
 * {
 *     // a removed, because root keys are handled by unistore
 *     b: {
 *         c: {
 *             d: 42, // updated
 *             f: 25, // new
 *             e: 3   // unchanged
 *         },
 *         f: { // f is not removed, because subkeys are not handled by unistore
 *             g: 4
 *         }
 *     }
 * }
 *
 * @example
 * // beware!
 * > extended({...sameAsBefore }, ['b.c'], { d: 42, f: 25 })
 * { 'b.c': { d: 42, f: 25 } } // the new key 'b.c' is created
 * @function
 */
export const extended = (state, extendedKey, value) => {
    if (!Array.isArray(extendedKey)) {
        return extended(state, extendedKey.split('.'), value);
    }
    if (!extendedKey.length) {
        return value;
    }

    const [firstKey, ...rest] = extendedKey;
    return toState(state, firstKey, extended(state[firstKey] || {}, rest, value));
};
