Workarea Google Analytics 2.1.4 (2019-06-11)
--------------------------------------------------------------------------------

*   Fix Configuration Docs Formatting

    The YAML and Ruby code examples in the "Configuration" section of the
    Workarea Google Analytics README weren't contained within code blocks,
    so they were formatted as Markdown when rendered in Homebase. This has
    been fixed and the aformentioned code blocks are now rendered as code, not
    as Markdown.

    Discovered by **Lance Harman**. Thanks for spotting this one, Lance!

    WGAG-41
    Tom Scott

*   Update for workarea v3.4 compatibility

    WGAG-40
    Matt Duffy

*   Fix JS linting errors

    ECOMMERCE-6081
    Ben Crouse

*   Leverage Workarea Changelog task

    ECOMMERCE-5355
    Curt Howard



WebLinc Google Analytics 2.1.3 (2017-12-12)
--------------------------------------------------------------------------------

*   Prevent Google Analytics firing events in test

    When the Rails environment is 'test', the Google Analytics script tag
    shouldn't actually send out events. This can cause extra data to appear
    in Google Analytics for a client, like "Integration Product", if one
    accidentally leaves in a production GA ID in their test secrets. We're
    now only sending GA analytics events if the rails_env is not 'test'.

    WGAG-34
    Tom Scott


WebLinc Google Analytics 2.1.2 (2017-10-31)
--------------------------------------------------------------------------------

*   Move configuration into initializers

    WGAG-35
    Matt Duffy

WebLinc Google Analytics 2.1.1 (2017-09-06)
--------------------------------------------------------------------------------

*   Updates payload for orders to use the correct order id.
    WGAG-32
    F.M. Bonnevier

*   Update addCartItem event to addToCartConfirmation

    WGAG-30
    Curt Howard

*   Hook into cart item confirmation analytics event

    WGAG-30
    Curt Howard

*   Fix typos in README

    WGAG-28
    Jake Beresford

*   Removed redundant callback for checkoutLoginView and decrement subsequent checkout step values

    WGAG-29
    Jake Beresford

*   Adds a summary of all events and payloads to the README

    WGAG-28
    Jake Beresford


WebLinc Google Analytics 2.1.0 (2017-08-08)
--------------------------------------------------------------------------------

*   Fix typos in README

    WGAG-28
    Jake Beresford

*   Removed redundant callback for checkoutLoginView and decrement subsequent checkout step values

    WGAG-29
    Jake Beresford

*   Adds a summary of all events and payloads to the README

    WGAG-28
    Jake Beresford


WebLinc Google Analytics 2.0.0 (2017-05-01)
--------------------------------------------------------------------------------

*   Upgrade google analytics for v3 compatability.

    WGAG-25
    Beresford, Jake

*   Add callback for validation error analytics events.

    WGAG-17
    Beresford, Jake

*   Add Google Analytics callback for flashMessage analytics events.

    WGAG-16
    Beresford, Jake

*   Add callback function for checkoutEdit button click analytics events.

    WGAG-19
    Beresford, Jake

*   Add callback function for primary navigation click analytics events.

    WGAG-15
    Beresford, Jake

*   Simplify the pageView callback for google analytics adapter.

    Logic to check whether the GA script has loaded is unnecessary, removing this logic reduces the size of the codebase.

    * Also removed unnecessary .keep files

    WGAG-10
    Beresford, Jake

*   Send browsing filter data as events

    Filter was previously omitted from the event offering for categoryView
    and searchResultsView events.

    WGAG-23
    Curt Howard

*   Fix categoryView/searchResultsView event reporting

    Send category name, page number, and current sort values as 'labels' in
    three separate event calls.

    WGAG-22
    Curt Howard

*   Add nonInteraction parameter to events that fire on page load

    Without nonInteraction set to true on events that are fired on page load, google analytics interprets the event as a user interaction, and therefore affects bounce rate. Even if the user doesn't view any subsequent pages, GA will not track that as a bounce. This parameter tells google that our event is not another interaction by the user.

    WGAG-4
    bberg


WebLinc Google Analytics 1.0.3 (2016-09-27)
--------------------------------------------------------------------------------

*   Send browsing filter data as events

    Filter was previously omitted from the event offering for categoryView
    and searchResultsView events.

    WGAG-23
    Curt Howard

*   Fix categoryView/searchResultsView event reporting

    Send category name, page number, and current sort values as 'labels' in
    three separate event calls.

    WGAG-22
    Curt Howard


WebLinc Google Analytics 1.0.2 (2016-04-04)
--------------------------------------------------------------------------------


WebLinc Google Analytics 1.0.1 (2016-03-28)
--------------------------------------------------------------------------------

*   Add nonInteraction parameter to events that fire on page load

    Without nonInteraction set to true on events that are fired on page load, google analytics interprets the event as a user interaction, and therefore affects bounce rate. Even if the user doesn't view any subsequent pages, GA will not track that as a bounce. This parameter tells google that our event is not another interaction by the user.

    WGAG-4
    bberg


WebLinc Google Analytics 1.0.0 (January 13, 2016)
--------------------------------------------------------------------------------

*   Update for compatibility with WebLinc 2.0

*   Replace absolute URLs with relative paths
