class FlightsController < ApplicationController
  def index
    if params[:date].present?
      @flights = Flight.where(date: params[:date])
      respond_to do |format|
        format.json { render json: { flights: @flights } }
        format.html # renders the index.html.erb
      end
    else
      @flights = Flight.all
    end
  end

  def new
    @flight = Flight.new
  end

  def create
    @flight = Flight.new(flight_params)
    if @flight.save
      redirect_to flights_path, notice: 'Flight record created successfully.'
    else
      render :new
    end
  end

  def edit
    @flight = Flight.find(params[:id])
  end

  def update
    @flight = Flight.find(params[:id])
    if @flight.update(flight_params)
      redirect_to flights_path, notice: 'Flight record updated successfully.'
    else
      render :edit
    end
  end

  def destroy
    @flight = Flight.find(params[:id])
    @flight.destroy
    redirect_to flights_path, notice: 'Flight record deleted successfully.'
  end

  private

  def flight_params
    params.require(:flight).permit(:date, :uav_type, :callsign, :from, :to, :takeoff_time, :landing_time, :bat_t_o, :bat_rth, :bat_ldg, :mission_type, :others, :pic)
  end
end
