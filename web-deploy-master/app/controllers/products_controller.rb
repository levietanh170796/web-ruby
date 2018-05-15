class ProductsController < ApplicationController
    def index
        @products = Product.select(:id, :name, :manufacturer, :description, :price)
            .order(id: :asc).paginate(page: params[:page])
    end


    def show
        @product = Product.find_by id: params[:id]
        render "products/show", :layout => false
    end

    # auto complete
    def autocomplete
        if params[:term]
            @products = Product.search(params[:term]).limit(10)
        else
            @products = Product.limit(10)
        end

        @result = Array.new
        @products.each do |item|
            puts item.id
            hash = { "value" => item.name, "id" => item.id , "price" => item.price, "manufactuer"=>item.manufacturer }
            @result << hash
        end

        respond_to do |format|  
            format.html # index.html.erb  
            format.json { render :json => @result.to_json }
        end
    end
end

