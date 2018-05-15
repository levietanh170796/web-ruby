class RemoveColumnToOrderDetails < ActiveRecord::Migration[5.1]
  def change
    remove_column :order_details, :sku, :string
  end
end
