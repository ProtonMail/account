/**
 * Add suffix Actions at the end of each functions.
 * As unistore merge states and actions it prevents conflicts
 * @param  {Object} actions
 * @return {Object}
 */
export default function toActions(actions = {}) {
  return Object.keys(actions).reduce((acc, key) => {
    acc[`${key}Action`] = actions[key];
    return acc;
  }, {});
}