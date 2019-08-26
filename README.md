WebLinc Google Analytics
================================================================================

A Workarea Commerce plugin for Google Analytics.

This plugin adds the Google Analytics (GA) script to the head of the site.
It also adds an analytics adapter and registers several callbacks for Workarea events which send a payload of data to GA.
This includes advanced ecommerce events, as well as custom events.

All OOTB events are listed below, payloads contain sample data.

Getting Started
--------------------------------------------------------------------------------

Add the gem to your application's Gemfile:

```ruby
# ...
gem 'workarea-google_analytics'
# ...
```

Update your application's bundle.

```bash
cd path/to/application
bundle
```

Configuration
--------------------------------------------------------------------------------

To integrate your Workarea application with Google Analytics you need configure your host application with your Google Analytics tracking ID in the "Analytics" section on the configuration page within the admin UI.

Shared Payloads
--------------------------------------------------------------------------------

These payloads are shared by many of the events detailed in the Summary of events below

#### Product Analytics data

Payload:

    id: "4559F84840",
    name: "Slim Ankle Pants",
    sku: "292205283-4",
    sale: false,
    price: 31.56,
    category: "Women's Pants"

---

#### Order Analytics Data

Payload:

    site_name: 'Site Name',
    id: 'CF6D17E28B',
    promo_codes: ['10percentoff'],
    shipping_service: 'USPS',
    shipping_total: 7.00,
    tax_total: 6.39,
    total_price: 84.23,
    tenders: 'Visa',
    items: Order Item Analytics Data (below) for each item in order.

---

#### Order Item Analytics Data

Payload:

    id: "4559F84840",
    product_id: "4559F84840",
    product_name:  "Slim Ankle Pants",
    sku: "292205283-4",
    price: 31.56,
    quantity: 1,
    category: "Women's Pants"


Summary of Events
--------------------------------------------------------------------------------
#### Page View
- Sent on every page, along with other events.
- No payload.
- No Events

---

#### Category View

Sent on category show pages (aka product browse)

Payload:

    name: "Women's Pants",
    sort: "top_sellers",
    page: 1,
    filters: {
        color: ['Red', 'Blue'],
        size: ['Small'],
        price: ['30.0-39.99']
    }

Sends 4 events:

| category | action | label | value |
|----------|--------|-------|-------|
| 'category' | 'view' | "Women's Pants" |  |
| 'category' | 'view' | "top_sellers" |  |
| 'category' | 'view' | 'page: 1' |  |
| 'category' | 'view' | 'color: Red, Blue' |  |
| 'category' | 'view' | 'size: Small' |  |
| 'category' | 'view' | 'price: 30.0-39.99' |  |

---

#### Search Results View
Sent on search results page

Payload:

    terms: 'red shirt',
    sort: 'relevance',
    page: 1,
    filters:  {
        size: ['Small'],
        price: ['30.0-39.99']
    },
    totalResults: 4

Sends 4 events:

| category | action | label | value |
|----------|--------|-------|-------|
| 'search results' | 'view' | 'red shirt' |  |
| 'search results' | 'view' | 'relevance' |  |
| 'search results' | 'view' | 'page: 1' |  |
| 'search results' | 'view' | 'size : small' |  |
| 'search results' | 'view' | 'price : 30.0-39.99' |  |

---

#### Product List
Sent anywhere there are lists of products, including: product browse, search results, cart page, product recommendations, category summary content block, product list content block.

Payload:

  name: 'Search results for "Red Shirt"', (name of the list e.g. 'Cart' or 'Custom product list')
  page: 1,
  per_page: 20,
  impressions: Product Analytics Data

Sends enhanced ecommerce event 'ec:addImpression' with the following options:

    'id': "4559F84840",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'position': 1

---

#### Product Click
Triggered when a user clicks on any product summary in the storefront.

Payload: Product Analytics Data

Sends 3 events
'ec:addProduct' with the following options:

    'id':"4559F84840",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'position': 1

'ec:setAction' click

    list: payload.list (the product list name)

| category | action | label | value |
|----------|--------|-------|-------|
| 'product' | 'click' | "Women's Pants" |  |

---

### Product Quickview
Triggered when a user opens a product quickview

Payload: Product Analytics Data

Sends 3 events

'ec:addProduct' with the following options:

    'id':"4559F84840",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",

'ec:setAction' detail

| category | action | label | value |
|----------|--------|-------|-------|
| 'product' | 'quickview' |  |  |

---

### Product View
Triggered when a user visits the product detail page

Payload - Product Analytics Data

Sends 2 events

'ec:addProduct' with the following options:

    'id':"4559F84840",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'nonInteraction': true

'ec:setAction' detail

---

### Add to cart
Triggered when add to cart button is clicked

Payload: Product Analytics Data

Sends 3 events

'ec:addProduct' with the following options:

    'id':"4559F84840",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1

'ec:setAction' add

| category | action | label | value |
|----------|--------|-------|-------|
| 'product' | 'click' | 'add to cart' |  |

---

### Cart View
Triggered when the cart page is opened, including cart summaries (drawer or dropdown)

Payload: Order Analytics Data

Sends 2 events

'ec:addProduct' for each product in cart with the following options:

    'id': "5AE9E86D6C",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1
    'nonInteraction': true

'ec:setAction' 'checkout' { 'step' : 1 }

---

### Update Cart Item
Triggered when a cart item is updated (quantity changed)

Payload: Order Item Analytics Data

| category | action | label | value |
|----------|--------|-------|-------|
| 'product' | 'click' | 'update cart' |  |

---

### Add To Cart Confirmation
Triggered when a cart item is added to the cart (confirmation dialog)

Payload: Order Item Analytics Data

| category | action | label | value |
|----------|--------|-------|-------|
| 'Add To Cart' | 'confirm' | 'item added' |  |

---

### Remove from Cart
Triggered when a product is removed from the cart

Payload: Order Item Analytics Data

Sends 3 events

'ec:addProduct' with the following options:

    'id': "5AE9E86D6C",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1

'ec:setAction' remove

| category | action | label | value |
|----------|--------|-------|-------|
| 'product' | 'click' | 'remove from cart' |  |

---

### Checkout Login
Triggered when user logs in during checkout

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'checkout' | 'start' | 'login' |  |

---

### Checkout Guest
Triggered when user begins checkout as a guest (no login)

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'checkout' | 'start' | 'guest' |  |

---

### Checkout Addresses View
Triggered on the Addresses step of checkout

Payload: Order Analytics Data

'ec:addProduct' for each product in cart with the following options:

    'id': "5AE9E86D6C",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1
    'nonInteraction': true

'ec:setAction' 'checkout' { 'step' : 2 }

---

### Checkout Shipping View
Triggered on the Shipping step of checkout

'ec:addProduct' for each product in cart with the following options:

    'id': "5AE9E86D6C",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1
    'nonInteraction': true

'ec:setAction' 'checkout' { 'step' : 3 }

---

### Checkout Payment View
Triggered on the Payment step of checkout

'ec:addProduct' for each product in cart with the following options:

    'id': "5AE9E86D6C",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1
    'nonInteraction': true

'ec:setAction' 'checkout' { 'step' : 4 }

---

### Checkout Payment Selected
Triggered when a payment option is clicked on the payment step of checkout.

Payload:

    type: 'new card'

'ec:setAction' 'checkout_option' { step: 4, option: payload.name }

---

### Checkout order placed
Triggered on the order confirmation page of checkout

Payload: Order Analytics Data

'ec:addProduct' for each product in cart with the following options:

    'id': "5AE9E86D6C",
    'name': "Slim Ankle Pants",
    'category': "Women's Pants",
    'variant': "292205283-4",
    'price': 31.56,
    'quantity': 1
    'nonInteraction': true

'ec:purchase' with the following options:

    'id': 'CF6D17E28B',
    'affiliation': 'Site Name',
    'revenue': 84.23,
    'tax': 6.39,
    'shipping': 7.00,
    'coupon': ['10percentoff']

---

### Checkout Signup
Triggered when user signs up for email notification in checkout

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'checkout' | 'signup' |  |  |

---

### Login
Triggered when user logs in to their account (not in checkout)

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'account' | 'login' |  |  |

---

### Logout
Triggered when user logs in to their account (not in checkout)

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'account' | 'logout' |  |  |

---

### Forgot Password
Triggered when user submits the forgot password form

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'account' | 'forgot password' |  |  |

---

### Signup
Triggered when user creates a new account (not in checkout)

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'account' | 'signup' |  |  |

---

### Share
Triggered when user clicks on one of the share buttons

Payload:

    type: share_type e.g. 'facebook'

| category | action | label | value |
|----------|--------|-------|-------|
| 'share' | 'click' | 'facebook' |  |

---

### Email Signup
Triggered when user signs up for email notifications (not in checkout)

Payload: none

| category | action | label | value |
|----------|--------|-------|-------|
| 'email' | 'signup' |  |  |

---

### Primary Navigation Click
Triggered when user clicks on a link in the primary navigation

Payload:

    name: 'Sale'
    url: 'www.yoursite.com/sale'

| category | action | label | value |
|----------|--------|-------|-------|
| 'nav' | 'select' | 'Sale' |  |

---

### Checkout Edit
Triggered when user clicks on an 'edit' button in checkout to change address or shipping.

Payload:

    type: step to edit ('addresses', 'shipping')

| category | action | label | value |
|----------|--------|-------|-------|
| 'Edit Button' | 'click' | 'addresses' |  |

---

### Flash Message
Triggered when a system flash message is shown

Payload:

    type: type (success | error | info)

| category | action | label | value |
|----------|--------|-------|-------|
| 'Flash Messaging' | 'Flash Messaging Triggered' | 'success' |  |

---

### Validation Error
Triggered when a jQuery validation message is displayed

Payload:

    location: checkout_page

Note: if this event happens outside fo checkout the location is set to 'application'

| category | action | label | value |
|----------|--------|-------|-------|
| 'JavaScript Validaton Error' | 'JavaScript Validation Error Triggered' | 'checkout - payment' |  |


Workarea Commerce Documentation
--------------------------------------------------------------------------------

See [https://developer.workarea.com](https://developer.workarea.com) for Workarea Commerce documentation.

License
--------------------------------------------------------------------------------

Workarea Google Analytics is released under the [Business Software License](LICENSE)
