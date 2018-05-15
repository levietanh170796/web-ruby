include SessionsHelper

RailsAdmin.config do |config|
  config.include Rails.application.routes.url_helpers

  # or something more dynamic
  config.main_app_name = Proc.new { |controller| [ "Web project", "Admin - #{controller.params[:action].try(:titleize)}" ] }

  config.authorize_with do |controller|
    if current_user.nil?
      redirect_to main_app.root_path
      flash[:error] = t "danger.log_in"
    elsif !current_user.is_admin?
      redirect_to main_app.root_path
      flash[:error] = "Only admin account can access this!"
    end
  end

  config.model "Product" do
      exclude_fields :comments, :order_details, :ordered, :commented_user
    edit do
      configure :update_date do
        hide
      end
    end
  end

  config.model "User" do
      exclude_fields :comments, :commented_product, :orders
    edit do
    end
  end
  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
