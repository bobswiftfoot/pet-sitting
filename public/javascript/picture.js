async function getPicture(elementId, fileId)
{
    await fetch(`/api/files/${fileId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then(res => res.body)
        .then(body => {
            const reader = body.getReader();
          
            return new ReadableStream({
              start(controller) {
                return pump();
          
                function pump() {
                  return reader.read().then(({ done, value }) => {
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                      controller.close();
                      return;
                    }
          
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                  });
                }
              }
            })
          })
          .then(stream => new Response(stream))
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(url => document.getElementById(elementId).src = url)
          .catch(err => console.error(err));
}
