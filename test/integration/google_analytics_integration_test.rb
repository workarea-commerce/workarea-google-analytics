require 'test_helper'

module Workarea
  module Storefront
    class GoogleAnalyticsIntegrationTest < Workarea::IntegrationTest
      include Workarea::Storefront::IntegrationTest

      def test_product_review
        Workarea.config.google_analytics_tracking_id = 'foobarbaz'

        get storefront.root_path
        assert_includes(response.body, 'foobarbaz')

      end
    end
  end
end
