/**
 * @function isExternal 判断路径是不是带协议的外链
 * @param  {string} path 路径
 * @returns {boolean} 是|否
 */
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);
