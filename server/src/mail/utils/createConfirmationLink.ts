import { v4 } from 'uuid';
import { CacheStore } from '@nestjs/common';

/**
 * @param url The client url
 * @param userId The user's id persist in database
 * @examples
 * This link is client confirmation route.
 */
export const createConfirmationLink = async (
  url: string,
  userId: number,
  cacheStore: CacheStore,
): Promise<string> => {
  const id = v4();
  await cacheStore.set(id, userId, { ttl: 60 * 60 * 24 });
  return `${url}/auth/confirmation/${id}`;
};
