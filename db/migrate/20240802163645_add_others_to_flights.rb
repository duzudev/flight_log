class AddOthersToFlights < ActiveRecord::Migration[7.1]
  def change
    add_column :flights, :others, :string
  end
end
