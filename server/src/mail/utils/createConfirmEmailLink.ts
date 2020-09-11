import { v4 } from 'uuid';
import { CacheStore } from '@nestjs/common';

/**
 * @param url The server url
 * @param userId The user's id persist in database
 * @examples
 * Assume that you already have rest api `api/mail/confirmation` on your server
 * - `https://my-site.com` => `https://my-site.com/api/mail/confirmation/<id>`
 */
export const createConfirmEmailLink = async (
  url: string,
  userId: number,
  cacheStore: CacheStore,
): Promise<string> => {
  const id = v4();
  await cacheStore.set(id, userId, { ttl: 60 * 60 * 24 });
  return `${url}/api/mail/confirmation/${id}`;
};
