const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/trips/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripDetails, people }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Trip created successfully!');
    } else {
      alert(data.error);
    }
  };
  