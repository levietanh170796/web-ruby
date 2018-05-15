class ProductCategory < ApplicationRecord
  has_many :products, class_name: "Product", foreign_key: "category_id"
end
