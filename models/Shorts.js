let data = [];

/**
 * @typedef Short
 * @prop {string} name - some string, valid in a URL path
 * @prop {string} url - link to an external source
 * @prop {string} creator - username
 */

/**
 * @class Shorts
 * Stores all Shorts.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Shorts {
  /**
   * Add a Short.
   * @param {string} name - Short name
   * @param {string} url - Short url
   * @param {string} creator - Short creator
   */
  static addOne(name, url, creator = null) {
    const short = { name, url, creator };
    data.push(short);
    return short;
  }

  /**
   * Find a Short by Name.
   * @param {string} name - name of Short to find
   * @return {Short | undefined} - found Short
   */
  static findOne(name) {
    return data.filter(short => short.name === name)[0];
  }

  /**
   * Return an array of all of the Shorts.
   * @return {Short[]}
   */
  static findAll() {
    return data;
  }

  /**
   * Update a Short.
   * @param {string} name - name of Short to update
   * @param {string} url - new URL
   * @return {Short | undefined} - updated Short
   */
  static updateOne(name, url) {
    const short = Shorts.findOne(name);
    short.url = url;
    return short;
  }

  /**
   * Delete a Short
   * @param {string} name - name of Short to delete
   * @return {Short | undefined} - deleted Short
   */
  static deleteOne(name) {
    const short = Shorts.findOne(name);
    data = data.filter(s => s.name !== name);
    return short;
  }
}

module.exports = Shorts;
