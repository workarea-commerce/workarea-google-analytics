Workarea.configure do |config|
  config.site_name = 'Workarea API'
  config.asset_store = :file_system, {
    root_path: '/tmp/workarea_api',
    server_root: '/tmp/workarea_api'
  }
end
