class Api::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    render json: Product.all
  end

  def show
    render json: @product
  end

  def create
    product = Product.new(product_params)

    if product.save
      render json: product
    else
      render json: product.errors.full_messages.join(', '), status: 422
    end
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: 422
    end
  end

  def destroy
    @product.destroy
  end
 
  private
    def product_params
      params.require(:product).permit(:name, :description, :department, :price)
    end

    def set_product
      @product = Product.find(params[:id])
    end


end
