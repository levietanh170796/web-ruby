class CreateDatabaseStructure < ActiveRecord::Migration[5.1]
  def change
    create_table :database_structures do |t|
    end
  end

  class << self
    def up
      ActiveRecord::Schema.define(version: 0) do

        create_table "comments", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.integer "user_id"
          t.integer "product_id", null: false
          t.string "comment", limit: 400, null: false, collation: "utf8_general_ci"
          t.datetime "date", default: -> { "CURRENT_TIMESTAMP" }, null: false
          t.timestamps
          t.index ["product_id"], name: "fk_Comments_2_idx"
          t.index ["user_id"], name: "fk_Comments_1_idx"
        end

        create_table "order_details", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.integer "order_id", null: false
          t.integer "product_id", null: false
          t.string "name", limit: 250, null: false
          t.float "price", limit: 24, null: false
          t.string "sku", limit: 50, null: false
          t.integer "quantity", null: false
          t.index ["order_id"], name: "fk_orderdetails_2_idx"
          t.index ["product_id"], name: "fk_orderdetails_1_idx"
        end

        create_table "orders", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.integer "user_id", null: false
          t.float "amount", limit: 24, null: false
          t.string "ship_name", limit: 100, null: false
          t.string "ship_address", limit: 100, null: false
          t.string "city", limit: 50, null: false
          t.string "zip", limit: 20, null: false
          t.string "country", limit: 50, null: false
          t.string "phone", limit: 20, null: false
          t.string "fax", limit: 20
          t.float "shipping", limit: 24, null: false
          t.float "tax", limit: 24, null: false
          t.string "email", limit: 100, null: false
          t.timestamps
          t.boolean "shipped", default: false, null: false
          t.string "tracking_number", limit: 80
          t.index ["user_id"], name: "fk_orders_1_idx"
        end

        create_table "product_categories", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.string "name", limit: 50, null: false
        end

        create_table "product_images", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.integer "product_id", null: false
          t.string "image", limit: 45, null: false, collation: "utf8_general_ci"
          t.index ["product_id"], name: "fk_productimages_1_idx"
        end

        create_table "products", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.string "sku", limit: 50, null: false
          t.string "name", limit: 500, collation: "utf8_unicode_ci"
          t.text "description", collation: "utf8_unicode_ci"
          t.string "manufacturer", limit: 50, null: false
          t.float "price", limit: 24, null: false
          t.float "weight", limit: 24, null: false
          t.integer "category_id"
          t.timestamp "update_date", default: -> { "CURRENT_TIMESTAMP" }, null: false
          t.integer "quantity", default: 1000, null: false
          t.index ["category_id"], name: "index2"
        end

        create_table "users", primary_key: "id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
          t.string "email", limit: 500
          t.string "password", limit: 500
          t.string "first_name", limit: 50
          t.string "last_name", limit: 50
          t.string "city", limit: 90
          t.timestamps
          t.string "phone", limit: 20
          t.string "country", limit: 20
          t.string "address", limit: 100
          t.string "zip", limit: 45
          t.string "fax", limit: 45
        end
      end
    end
  end
end
