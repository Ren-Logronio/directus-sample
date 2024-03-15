import { createDirectus, authentication, graphql, rest, DirectusClient, GraphqlClient, RestClient, AuthenticationClient } from '@directus/sdk';
import { authLocalStorage } from '../util/authStorage';

export class DirectusSingleton {
    private static instance: DirectusClient<any> & GraphqlClient<any> & RestClient<any> & AuthenticationClient<any>;

    public static getInstance(rebuild = false): DirectusClient<any> & GraphqlClient<any> & RestClient<any> & AuthenticationClient<any> {
        if (!DirectusSingleton.instance || rebuild) {
            DirectusSingleton.instance = createDirectus(import.meta.env.VITE_DIRECTUS_CLIENT_HOST)
                .with(graphql({ credentials: 'include' }))
                .with(rest({ credentials: 'include' }))
                .with(authentication("json", { credentials: 'include', storage: authLocalStorage() }));
        };
        return DirectusSingleton.instance;
    };
};

export const directusClient = DirectusSingleton.getInstance();