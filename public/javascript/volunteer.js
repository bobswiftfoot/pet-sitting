async function volunteerHandler(careDayID)
{
    const response = await fetch(`/api/caredays/volunteer/${careDayID}`, {
        method: 'put',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok)
    {
        document.location.replace('/calendar');
    } 
    else
    {
        alert(response.statusText);
    }
}