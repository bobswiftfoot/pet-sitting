async function editFormHandler(event) {
  event.preventDefault();

  console.log("---------------------");

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_body = document.querySelector('textarea[name="post-body"]').value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // post or posts?????
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_body
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/posts");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#editSaveBtn")
  .addEventListener("click", editFormHandler);
