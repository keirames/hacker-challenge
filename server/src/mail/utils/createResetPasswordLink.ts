import { CacheStore } from '@nestjs/common';
import { v4 } from 'uuid';

/**
 * @param url The client url
 * @param userId The user's id persist in database
 * @examples
 * This link is client reset password route.
 */
export const createResetPasswordLink = async (
  url: string,
  userId: number,
  cacheStore: CacheStore,
): Promise<string> => {
  const id = v4();
  await cacheStore.set(id, userId, { ttl: 60 * 20 });
  return `${url}/auth/reset-password/${id}`;
};
