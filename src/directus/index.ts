import { createDirectus, authentication, graphql, rest } from '@directus/sdk';

export const directusClient = createDirectus(import.meta.env.VITE_DIRECTUS_CLIENT_HOST || 'http://localhost:8055', {

})
    .with(authentication("json", { credentials: 'include' }))
    .with(graphql({ credentials: 'include' }))
    .with(rest({ credentials: 'include' }));