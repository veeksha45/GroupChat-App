document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await res.json();

    if (res.status === 201) {
      alert('Successfully signed up');
    } else if (res.status === 409) {
      alert('User already exists, Please Login');
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Error connecting to server');
  }
});
