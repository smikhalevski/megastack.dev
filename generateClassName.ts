import crypto from 'crypto';

const HASH_LENGTH = 4;

export function generateClassName(name, filename, isMinified) {
  const hash = crypto
    .createHash('sha256')
    .update(name + filename)
    .digest('base64')
    .replace(/\W/g, '');

  if (!isMinified) {
    return name + '_' + hash.substring(0, HASH_LENGTH);
  }

  if (hash.charCodeAt(0) < 65 /*A*/) {
    return String.fromCharCode(hash.charCodeAt(0) + 65 /*A*/ - 48 /*0*/) + hash.substring(1, HASH_LENGTH);
  }

  return hash.substring(0, HASH_LENGTH);
}
