class CreateFlights < ActiveRecord::Migration[7.1]
  def change
    create_table :flights do |t|
      t.date :date
      t.string :uav_type
      t.string :callsign
      t.string :from
      t.string :to
      t.time :takeoff_time
      t.time :landing_time
      t.integer :bat_t_o
      t.integer :bat_rth
      t.integer :bat_ldg
      t.string :mission_type
      t.string :pic

      t.timestamps
    end
  end
end
