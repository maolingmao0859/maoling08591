import type { Access, PayloadRequest } from 'payload';
export const adminOnly = ({ req }: {req:PayloadRequest}) => Boolean(req.user?.collection === 'users');
export const publishedOrAdmin: Access = ({ req }) => req.user?.collection === 'users' ? true : { _status: { equals: 'published' } };
