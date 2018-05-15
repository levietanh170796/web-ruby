class RemoveFieldFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :city, :string
    remove_column :users, :phone, :string
    remove_column :users, :country, :string
    remove_column :users, :address, :string
    remove_column :users, :zip, :string
    remove_column :users, :fax, :string
  end
end
