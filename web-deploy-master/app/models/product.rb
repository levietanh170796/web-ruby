class Product < ApplicationRecord
  has_many :order_details, class_name: "OrderDetail", foreign_key: "product_id",
    dependent: :destroy
  has_many :ordered, through: :order_details, source: :order

  has_many :images, class_name: "ProductImage", foreign_key: "product_id",
    dependent: :destroy

  belongs_to :category, class_name: "ProductCategory"

  # Auto complete
  def self.search(term)
    where('LOWER(name) LIKE :term OR LOWER(manufacturer) LIKE :term', term: "%#{term.downcase}%")
  end
end
