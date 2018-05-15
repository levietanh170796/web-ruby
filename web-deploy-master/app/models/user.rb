class User < ApplicationRecord
  has_many :orders, foreign_key: "user_id", dependent: :destroy
  has_many :user_details, class_name: "UserDetail", dependent: :destroy, inverse_of: :user
  accepts_nested_attributes_for :user_details,
    reject_if: ->(attrs) { attrs["country"].blank? || attrs["city"].blank? || attrs["phone"].blank? || attrs["address"].blank? }

  attr_accessor :remember_token, :activation_token, :reset_token

  before_save :downcase_email
  before_create :create_activation_digest

  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  validates :first_name, presence: true, length: {minimum: 1, maximum: 50}
  validates :last_name, presence: true, length: {minimum: 1, maximum: 50}

  validates :email, presence: true, length: {maximum: 255},
    format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
  validates :password, presence: true, length: {minimum:6}, allow_blank: true

  has_secure_password

  class << self
    def digest string
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
        BCrypt::Engine.cost
      BCrypt::Password.create string, cost: cost
    end

    def new_token
      SecureRandom.urlsafe_base64
    end

    def from_omniauth auth_hash
      user = find_or_create_by uid: auth_hash["uid"], provider: auth_hash["provider"]
      user.first_name = auth_hash["info"]["first_name"]
      user.last_name = auth_hash["info"]["last_name"]
      user.email = auth_hash["info"]["email"]
      user.password = "123456"
      user.activate
      user.save!
      user
    end
  end

  def current_user? user
    user == self
  end

  def remember
    self.remember_token = User.new_token
    update_attributes remember_digest: User.digest(remember_token)
  end

  def authenticated? attribute, token
    digest = send "#{attribute}_digest"
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password? token
  end

  def forget
    update_attribute :remember_digest, nil
  end

  def activate
    update_attributes activated: true, activated_at: Time.zone.now
  end

  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  def create_reset_digest
     self.reset_token = User.new_token
     update_attributes reset_digest: User.digest(reset_token),
       reset_sent_at: Time.zone.now
   end

   def send_password_reset_email
     UserMailer.password_reset(self).deliver_now
   end

   def password_reset_expired?
     reset_sent_at < Settings.time_reset.hours.ago
   end

  private

  def downcase_email
    email.downcase!
  end

  def create_activation_digest
    self.activation_token = User.new_token
    self.activation_digest = User.digest activation_token
  end
end
