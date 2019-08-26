Workarea::Configuration.define_fields do
  fieldset 'Analytics', namespaced: false do
    field 'Google Analytics Tracking ID',
      type: :string,
      default: 'TODO',
      description: 'Tracking id to use for tracking google analytics.'
  end
end
