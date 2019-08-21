module Workarea
  module GoogleAnalytics
    class Engine < ::Rails::Engine
      include Plugin
      isolate_namespace GoogleAnalytics
    end
  end
end
