'use strict';

(() => {
    if (window.__bd && window.__bd.ignited) return;

    console.log('[BetterDiscord|Sparkplug]');

    const ls = window.localStorage;
    if (!ls) console.warn('[BetterDiscord|Sparkplug] Failed to hook localStorage :(');
    const wsOrig = window.WebSocket;

    window.__bd = {
        localStorage: ls,
        wsHook: null,
        wsOrig,
        ignited: true
    };

    window.WebSocket = function (endpoint, protocols) {
        console.info(`[BetterDiscord|WebSocket Proxy] new WebSocket detected, endpoint: ${endpoint}`);
        const wsHook = new wsOrig(endpoint, protocols);
        if (window.__bd.setWS) {
            window.__bd.setWS(wsHook);
            console.info(`[BetterDiscord|WebSocket Proxy] WebSocket sent to instance`);
        } else {
            window.__bd['wsHook'] = wsHook;
            console.info(`[BetterDiscord|WebSocket Proxy] WebSocket stored to __bd['wsHook']`);
        }

        return wsHook;
    };
})();