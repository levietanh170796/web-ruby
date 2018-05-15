class OrdersController < ApplicationController
    def new
        @order = Order.new
    end

    def create
        @order = Order.new order_params
        # @order.order_details_attributes.product_id = id;
        if logged_in?
            @order.user_id = current_user.id
        else 
            @order.user_id = -1
        end
        if @order.save
            flash[:success] = "Order success"
            redirect_to root_url
        else
            render :new
        end
    end

    def index
    end

    private

    def order_params
        params.require(:order).permit :country, :first_name, :last_name, :address, :city, :phone, :email,
            order_details_attributes: [:id, :order_id, :product_id, :name, :price, :quantity, :_destroy]  
    end
end