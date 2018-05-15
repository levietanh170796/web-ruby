# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171222174731) do

  create_table "comments", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer "user_id"
    t.integer "product_id", null: false
    t.string "comment", limit: 400, null: false, collation: "utf8_general_ci"
    t.datetime "date", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "fk_Comments_2_idx"
    t.index ["user_id"], name: "fk_Comments_1_idx"
  end

  create_table "order_details", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer "order_id", null: false
    t.integer "product_id", null: false
    t.string "name", limit: 250, null: false
    t.float "price", limit: 24, null: false
    t.integer "quantity", null: false
    t.index ["order_id"], name: "fk_orderdetails_2_idx"
    t.index ["product_id"], name: "fk_orderdetails_1_idx"
  end

  create_table "orders", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer "user_id", null: false
    t.string "city", limit: 50, null: false
    t.string "country", limit: 50, null: false
    t.string "phone", limit: 20, null: false
    t.string "email", limit: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tracking_number", limit: 80
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.index ["user_id"], name: "fk_orders_1_idx"
  end

  create_table "product_categories", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "name", limit: 50, null: false
  end

  create_table "product_images", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer "product_id", null: false
    t.string "image", limit: 45, null: false, collation: "utf8_general_ci"
    t.index ["product_id"], name: "fk_productimages_1_idx"
  end

  create_table "products", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
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

  create_table "user_details", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "country", null: false
    t.string "city", null: false
    t.string "address", null: false
    t.string "phone", null: false
    t.integer "user_id", null: false
  end

  create_table "users", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "email", limit: 500
    t.string "first_name", limit: 50
    t.string "last_name", limit: 50
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "remember_digest"
    t.boolean "is_admin"
    t.string "activation_digest"
    t.boolean "activated"
    t.datetime "activated_at"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.string "provider"
    t.string "uid"
  end

end
