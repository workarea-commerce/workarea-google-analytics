/* eslint no-console: "off" */
/* global console, ga */

/**
 * @namespace WORKAREA.googleAnalytics
 */
WORKAREA.analytics.registerAdapter('googleAnalytics', function () {
    'use strict';

    var propertyId = $('meta[property="ga-tracking-id"]').attr('content'),
        send = function () {
            if (WORKAREA.analytics.debug) {
                console.log(arguments);
            }

            if (!WORKAREA.environment.isTest) {
              ga.apply(ga, arguments);
            }
        };

    send('create', propertyId, 'auto');
    send('require', 'ec');

    return {
        'pageView': function() {
            send('send', 'pageview');
        },

        'categoryView': function (payload) {
            send('send', 'event', 'category', 'view', payload.name, {
                'nonInteraction': true
            });
            send('send', 'event', 'category', 'view', payload.sort, {
                'nonInteraction': true
            });
            send('send', 'event', 'category', 'view', 'page:' + payload.page, {
                'nonInteraction': true
            });
            _.forEach(payload.filters, function (values, name) {
                _.forEach(values, function (value) {
                    send('send', 'event', 'category', 'view', name + ':' + value, {
                        'nonInteraction': true
                    });
                });
            });
        },

        'searchResultsView': function (payload) {
            send('send', 'event', 'search results', 'view', payload.terms, {
                'nonInteraction': true
            });
            send('send', 'event', 'search results', 'view', payload.sort, {
                'nonInteraction': true
            });
            send('send', 'event', 'search results', 'view', 'page:' + payload.page, {
                'nonInteraction': true
            });
            _.forEach(payload.filters, function (values, name) {
                _.forEach(values, function (value) {
                    send('send', 'event', 'search results', 'view', name + ':' + value, {
                        'nonInteraction': true
                    });
                });
            });
        },

        'productList': function (payload) {
            _.each(payload.impressions, function (impression) {
                send('ec:addImpression', {
                    'id': impression.id,
                    'name': impression.name,
                    'category': impression.category,
                    'variant': impression.sku,
                    'list': payload.name,
                    'position': impression.position
                });
            });
        },

        'productClick': function (payload) {
            send('ec:addProduct', {
                'id': payload.id,
                'name': payload.name,
                'category': payload.category,
                'variant': payload.sku,
                'position': payload.position
            });

            send('ec:setAction', 'click', { list: payload.list });
            send('send', 'event', 'product', 'click', payload.list);
        },

        'productQuickView': function (payload) {
            send('ec:addProduct', {
                'id': payload.id,
                'name': payload.name,
                'category': payload.category,
                'variant': payload.sku
            });

            send('ec:setAction', 'detail');
            send('send', 'event', 'product', 'quickview');
        },

        'productView': function (payload) {
            send('ec:addProduct', {
                'id': payload.id,
                'name': payload.name,
                'category': payload.category,
                'variant': payload.sku,
                'nonInteraction': true
            });

            send('ec:setAction', 'detail');
        },

        'addToCart': function (payload) {
            send('ec:addProduct', {
                'id': payload.id,
                'name': payload.name,
                'category': payload.category,
                'variant': payload.sku,
                'price': payload.price,
                'quantity': payload.quantity
            });

            send('ec:setAction', 'add');
            send('send', 'event', 'product', 'click', 'add to cart');
        },

        'cartView': function (payload) {
            _.each(payload.items, function (impression) {
                send('ec:addProduct', {
                    'id': impression.product_id,
                    'name': impression.product_name,
                    'category': impression.category,
                    'variant': impression.sku,
                    'price': impression.price,
                    'quantity': impression.quantity,
                    'nonInteraction': true
                });
            });

            send('ec:setAction', 'checkout', { 'step': 1 });
        },

        'updateCartItem': function () {
            send('send', 'event', 'product', 'click', 'update cart');
        },

        'addToCartConfirmation': function() {
            send('send', 'event', 'Add To Cart', 'confirm', 'item added');
        },

        'removeFromCart': function (payload) {
            send('ec:addProduct', {
                'id': payload.product_id,
                'name': payload.product_name,
                'category': payload.category,
                'variant': payload.sku,
                'price': payload.price,
                'quantity': payload.quantity
            });

            send('ec:setAction', 'remove');
            send('send', 'event', 'product', 'click', 'remove from cart');
        },

        'checkoutLogin': function () {
            send('send', 'event', 'checkout', 'start', 'login');
        },

        'checkoutGuest': function () {
            send('send', 'event', 'checkout', 'start', 'guest');
        },

        'checkoutAddressesView': function (payload) {
            _.each(payload.items, function (impression) {
                send('ec:addProduct', {
                    'id': impression.product_id,
                    'name': impression.product_name,
                    'category': impression.category,
                    'variant': impression.sku,
                    'price': impression.price,
                    'quantity': impression.quantity,
                    'nonInteraction': true
                });
            });

            send('ec:setAction', 'checkout', { 'step': 2 });
        },

        'checkoutShippingView': function (payload) {
            _.each(payload.items, function (impression) {
                send('ec:addProduct', {
                    'id': impression.product_id,
                    'name': impression.product_name,
                    'category': impression.category,
                    'variant': impression.sku,
                    'price': impression.price,
                    'quantity': impression.quantity,
                    'nonInteraction': true
                });
            });

            send('ec:setAction', 'checkout', { 'step': 3 });
        },

        'checkoutShippingMethodSelected': function (payload) {
            send('ec:setAction', 'checkout_option', {
                'step': 3,
                'option': payload.name
            });

            send('send', 'event', 'checkout', 'click', 'select shipping method');
        },

        'checkoutPaymentView': function (payload) {
            _.each(payload.items, function (impression) {
                send('ec:addProduct', {
                    'id': impression.product_id,
                    'name': impression.product_name,
                    'category': impression.category,
                    'variant': impression.sku,
                    'price': impression.price,
                    'quantity': impression.quantity,
                    'nonInteraction': true
                });
            });

            send('ec:setAction', 'checkout', { 'step': 4 });
        },

        'checkoutPaymentSelected': function (payload) {
            send('ec:setAction', 'checkout_option', {
                'step': 4,
                'option': payload.type
            });

            send('send', 'event', 'checkout', 'click', 'select payment');
        },

        'checkoutOrderPlaced': function (payload) {
            _.each(payload.items, function (impression) {
                send('ec:addProduct', {
                    'id': impression.product_id,
                    'name': impression.product_name,
                    'category': impression.category,
                    'variant': impression.sku,
                    'price': impression.price,
                    'quantity': impression.quantity
                });
            });

            send('ec:setAction', 'purchase', {
                'id': payload.id,
                'affiliation': payload.site_name,
                'revenue': payload.total_price,
                'tax': payload.tax_total,
                'shipping': payload.shipping_total,
                'coupon': payload.promo_codes.join(',')
            });
        },

        'checkoutSignup': function () {
            send('send', 'event', 'checkout', 'signup');
        },

        'login': function () {
            send('send', 'event', 'account', 'login');
        },

        'logout': function () {
            send('send', 'event', 'account', 'logout');
        },

        'forgotPassword': function () {
            send('send', 'event', 'account', 'forgot password');
        },

        'signup': function () {
            send('send', 'event', 'account', 'signup');
        },

        'share': function (payload) {
            send('send', 'event', 'share', 'click', payload.type);
        },

        'emailSignup': function () {
            send('send', 'event', 'email', 'signup');
        },

        'primaryNavigationClick': function(payload) {
            send('send', 'event', 'nav', 'select', payload.name);
        },

        'checkoutEdit': function(payload) {
            send('send', 'event', 'Edit Button', 'Click', payload.type);
        },

        'flashMessage': function(payload) {
            send('send', 'event', 'Flash Messaging', 'Flash Messaging Triggered', payload.type);
        },

        'validationError': function(payload) {
            var location = 'application';

            if (!_.isEmpty(payload.model)) {
                location = 'checkout - ' + payload.model;
            }
            send('send', 'event', 'JavaScript Validaton Error', 'JavaScript Validation Error Triggered', location);
        }
    };
});
