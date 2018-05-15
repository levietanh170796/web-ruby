facebook_config_file = File.join(::Rails.root,'config','facebook.yml')
unless File.exists? facebook_config_file
  raise "#{facebook_config_file} is missing!"
end
facebook_config = YAML.load_file(facebook_config_file)[::Rails.env]
OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
provider :facebook, facebook_config["app_id"], facebook_config["secret"], scope: "public_profile, email",
 info_fields: "id,first_name,middle_name,last_name,email,name,link"
end
