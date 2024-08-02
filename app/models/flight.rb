class Flight < ApplicationRecord
  validates :date, :uav_type, :callsign, :from, :to, :takeoff_time, :landing_time, :bat_t_o, :bat_rth, :bat_ldg, :mission_type, :pic, presence: true
end
