class RemoveColumnToOrders < ActiveRecord::Migration[5.1]
  def change
    remove_column :orders, :amount, :string
    remove_column :orders, :ship_name, :string
    remove_column :orders, :ship_address, :string
    remove_column :orders, :zip, :string
    remove_column :orders, :fax, :string
    remove_column :orders, :shipping, :string
    remove_column :orders, :shipped, :string
    remove_column :orders, :tax, :string
  end
end
