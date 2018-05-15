class SessionsController < ApplicationController
  def new
    render "sessions/new", :layout => false
  end

  def create
    if params[:session].present?
      user = User.find_by email: params[:session][:email].downcase
      if user && user.authenticate(params[:session][:password])
        if user.activated?
          log_in user
          flash[:success] = t "success.login"
          params[:session][:remember_me] == "1" ? remember(user) : forget(user)
          redirect_back_or user
        else
          flash[:warning] = t "warning.activation"
          redirect_to root_url
        end
      else
        flash[:error] = t "danger.email"
        redirect_to root_url
      end
    else
      user = User.from_omniauth(request.env["omniauth.auth"])
      if user
        user.activate
        log_in user
        flash.now[:success] = t "success.login"
        redirect_back_or user
      else
        redirect_to root_url
      end
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
