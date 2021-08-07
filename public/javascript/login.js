async function signupFormHandler(event)
{
    event.preventDefault();

    const user_name = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (user_name && email && password)
    {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok)
        {
            document.location.replace('/profile');
        }
        else if(response.status == 401)
        {
            alert("Email is already registered.");
        }
        else
        {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event)
{
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password)
    {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok)
        {
            document.location.replace('/profile');
        } 
        else
        {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);