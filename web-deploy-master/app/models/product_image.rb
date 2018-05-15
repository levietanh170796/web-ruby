class ProductImage < ApplicationRecord
  belongs_to :product, class_name: "Product"

  validates :product_id, presence: true
end
