Rails.application.routes.draw do
  resources :flights  # This includes all standard RESTful routes (index, new, create, edit, update, destroy)

  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "flights#index"
end
