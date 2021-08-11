async function newFormHandler(event) {
    event.preventDefault();
  
    const pet_id = document.querySelector('select[name="pet_id"]').value;
    const type_of_care = document.querySelector('select[name="type_of_care"]').value;
    const day_of_care = document.querySelector('input[name="day_of_care"]').value;
  
    const response = await fetch('/api/caredays/', {
      method: "POST",
      body: JSON.stringify({
        pet_id,
        type_of_care,
        day_of_care,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/calendar");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector("#uploadForm")
    .addEventListener("submit", newFormHandler);
  