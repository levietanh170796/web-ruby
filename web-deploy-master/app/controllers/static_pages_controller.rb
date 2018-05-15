class StaticPagesController < ApplicationController
  def home
    @best_products = Product.limit 12
    # @best_products = Product.joins(:order_details).group("products.id").order("sum(order_details.quantity) deSC").limit 12
    @new_products = Product.order("update_date desc").limit 12
  end

  def index
  end

  def help
  end
end
