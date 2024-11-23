const express = require('express');  // Import express
const app = express();  // Initialize the express app

const PORT = process.env.PORT || 5000; // Set the port

// Add any routes or middleware here (e.g., app.use())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
