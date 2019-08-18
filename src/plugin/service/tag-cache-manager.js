import { LocalStorageManager } from '../../service/localstorage-manager';

/**
 * Service Class for caching React state and TagContext
 */
class TagCacheManager {

  /**
   * @callback generateCacheKey
   * @param {TagContext} tagContext - TagContext instance
   * @returns {string} Cache key from TagContext
   *
   */

  /**
   *
   * @param {string} cacheNs Used as LocalStorageManager namespace
   * @param {generateCacheKey} generateCacheKey
   */
  constructor(cacheNs, generateCacheKey) {
    if (cacheNs == null) {
      throw new Error('args \'cacheNs\' is required.');
    }
    if (generateCacheKey == null) {
      throw new Error('args \'generateCacheKey\' is required.');
    }
    if (typeof generateCacheKey !== 'function') {
      throw new Error('args \'generateCacheKey\' should be function.');
    }

    this.cacheNs = cacheNs;
    this.generateCacheKey = generateCacheKey;
  }

  /**
   *
   * @param {TagContext} tagContext
   * @returns
   */
  getStateCache(tagContext) {
    const localStorageManager = LocalStorageManager.getInstance();

    const key = this.generateCacheKey(tagContext);
    const stateCache = localStorageManager.retrieveFromSessionStorage(this.cacheNs, key);

    return stateCache;
  }

  /**
   * store state object of React Component with specified key
   *
   * @param {TagContext} tagContext
   * @param {object} state state object of React Component
   */
  cacheState(tagContext, state) {
    const localStorageManager = LocalStorageManager.getInstance();
    const key = this.generateCacheKey(tagContext);
    localStorageManager.saveToSessionStorage(this.cacheNs, key, state);
  }

  /**
   * clear all state caches
   */
  clearAllStateCaches() {
    const localStorageManager = LocalStorageManager.getInstance();
    localStorageManager.saveToSessionStorage(this.cacheNs, {});
  }

}

module.exports = TagCacheManager;
