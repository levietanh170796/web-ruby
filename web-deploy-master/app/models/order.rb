class Order < ApplicationRecord
  belongs_to :user

  has_many :order_details, class_name: "OrderDetail", foreign_key: "order_id",
    dependent: :destroy
  accepts_nested_attributes_for :order_details,
    reject_if: ->(attrs) { attrs["product_id"].blank? || attrs["name"].blank? || attrs["price"].blank? || attrs["quantity"].blank? }
  has_many :ordered_product, through: :order_details, source: :product
end
