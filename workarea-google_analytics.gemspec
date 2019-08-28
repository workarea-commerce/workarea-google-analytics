$:.push File.expand_path('../lib', __FILE__)

require 'workarea/google_analytics/version'

Gem::Specification.new do |s|
  s.name        = 'workarea-google_analytics'
  s.version     = Workarea::GoogleAnalytics::VERSION
  s.authors     = ['Ben Crouse']
  s.email       = ['bcrouse@workarea.com']
  s.homepage    = 'https://github.com/workarea-commerce/workarea-google-analytics'
  s.summary     = 'Google Analytics integration for the Workarea Commerce Platform'
  s.description = 'Provides Google Analytics Enhanced Ecommerce integration for the Workarea Commerce Platform.'

  s.files = `git ls-files`.split("\n")

  s.license = 'Business Software License'

  s.required_ruby_version = '>= 2.0.0'

  s.add_dependency 'workarea', '~> 3.x', '>= 3.5.x'
end
