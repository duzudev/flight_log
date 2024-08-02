// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "bootstrap"

document.addEventListener('DOMContentLoaded', () => {
  const missionTypeSelect = document.getElementById('mission_type_select');
  const othersTextarea = document.getElementById('others_textarea');

  missionTypeSelect.addEventListener('change', function() {
    if (this.value === 'others') {
      othersTextarea.style.display = 'block';
    } else {
      othersTextarea.style.display = 'none';
    }
  });
});

  