const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDB = require('./connection');
const farmersLoginSchema = require('./FarmersLogin'); 
const SecurityQuestionSchema = require('./FarmersSecurityQuestion');
const productSchema = require('./Product');
const personalDetailSchema = require('./PersonalDetailsSchema');
const buyersLoginSchema = require('./BuyersLogin'); 
const bPersonalDetailSchema = require('./BPersonalDetailsSchema');
const purchaseRequestSchema = require('./PurchaseRequest');


dotenv.config();
const app = express();

connectDB(); // Establish connection to MongoDB Atlas

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Initialize FarmersLogin model globally once the database connection is established
let FarmersLogin;
let SecurityQuestion;
let AddProduct;
let PersonalDetails;

let BuyersLogin;
let BPersonalDetails;

let PurchaseRequest;
mongoose.connection.on('connected', () => {

    //Farmers Database Section
    const farmersDb = mongoose.connection.useDb('Farmers');
    FarmersLogin = farmersDb.model('FarmersLogin', farmersLoginSchema, 'LoginData');
    SecurityQuestion = farmersDb.model('FarmersSecurityQuestion', SecurityQuestionSchema, 'SecurityAnswers');
    AddProduct = farmersDb.model('Product', productSchema, 'AddedProduct');
    PersonalDetails = farmersDb.model('PersonalDetailsSchema', personalDetailSchema, 'PersonalDetails');
    
    // Buyers Database Section
    
    const buyersDb = mongoose.connection.useDb('Buyers');
    BuyersLogin = buyersDb.model('BuyersLogin', buyersLoginSchema, 'BLoginData');
    BPersonalDetails = buyersDb.model('BPersonalDetailsSchema', bPersonalDetailSchema, 'BPersonalDetails');
    console.log('BuyersLogin model initialized.');

    //Farmers-Buyers Connection Section
    const sharedDb = mongoose.connection.useDb('Shared');
    PurchaseRequest = sharedDb.model('PurchaseRequest', purchaseRequestSchema, 'PurchaseRequests');
});


// Farmer's Signup route 
app.post('/signup', async (req, res) => { 
  const { fullName, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const fullNameRegex = /^[A-Za-z]{2,}\s[A-Za-z]{2,}$/;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  const sanitizedEmail = email.toLowerCase(); // Convert email to lowercase

  if (!fullNameRegex.test(fullName)) {
    return res.status(400).json({
      message: 'Full Name must include first and last name, each at least 2 characters long',
    });
  }

  if (!emailRegex.test(sanitizedEmail)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, contain at least one uppercase letter, and one number',
    });
  }

  try {
    const existingUser = await FarmersLogin.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new FarmersLogin({
      fullName,
      email: sanitizedEmail, // Save email in lowercase
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Farmers Secutity Questions

app.post('/SecurityQuestion', async (req, res) => {
  const { email, securityQuestion, securityAnswer } = req.body;

  if (!email || !securityQuestion || !securityAnswer) {
    console.error('Missing required fields:', { email, securityQuestion, securityAnswer });
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    console.log('SecurityQuestion is using the database:', SecurityQuestion.db.name); // Debugging log
    const hashedAnswer = await bcrypt.hash(securityAnswer, 10);

    const newEntry = await SecurityQuestion.findOneAndUpdate(
      { email }, // Search for existing entry by email
      { question: securityQuestion, answer: hashedAnswer }, // Update or create with new data
      { upsert: true, new: true } // Create if not found
    );
    
    console.log('Security question saved:', newEntry);
    res.status(201).json({ message: 'Security question saved successfully' });
  } catch (error) {
    console.error('Error saving security question:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});




// Farmer's Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const sanitizedEmail = email.toLowerCase();
      const user = await FarmersLogin.findOne({ email: sanitizedEmail });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If the passwords match, return user data (including name)
      res.status(200).json({
        message: 'Login successful',
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }

});


// Forgot Password Section for Farmers

// Forgot Password Request (Validate email)
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const securityRecord = await SecurityQuestion.findOne({ email });
    

    if (!securityRecord) {
      return res.status(400).json({ message: 'Email not found in security questions' });
    }

    // If found, send the security question
    res.status(200).json({
      message: 'Security question found',
      question: securityRecord.question,
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
});

// Validate Answer
app.post('/validate-answer', async (req, res) => {
  const { email, answer } = req.body;

  if (!email || !answer) {
    console.error('Missing required fields:', { email, answer });
    return res.status(400).json({ message: 'Email and answer are required' });
  }

  try {
    const securityRecord = await SecurityQuestion.findOne({ email });

    if (!securityRecord) {
      return res.status(400).json({ message: 'Email not found in security questions' });
    }

    // Compare the provided answer with the hashed answer in the database
    const isMatch = await bcrypt.compare(answer, securityRecord.answer);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect answer to the security question' });
    }

    res.status(200).json({ message: 'Answer verified successfully' });
  } catch (error) {
    console.error('Error in /validate-answer:', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
});


// 2. Verify Answer and Reset Password
// Update Password
app.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    console.error('Missing required fields:', { email, newPassword });
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await FarmersLogin.updateOne({ email }, { password: hashedPassword });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in /update-password:', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
});



// Farmers Add Product Route

app.post('/addProduct', async (req, res) => {
  const { farmerEmail, productName, quantity, price, date } = req.body;

  if (!farmerEmail || !productName || !quantity || !price || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('Adding product for farmer:', farmerEmail); // Log the farmer email

    const existingProduct = await AddProduct.findOne({ farmerEmail, productName });
    if (existingProduct) {
      return res.status(400).json({ message: 'This product is already added by the farmer.' });
    }

    const newProduct = new AddProduct({
      farmerEmail,
      productName,
      quantity,
      price,
      date,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error); // Log the error on the server
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});





// Get Products Route
app.get('/products', async (req, res) => {
  const { farmerEmail } = req.query;  // Get the farmer's email from query params
  try {
    // Ensure farmerEmail is passed and find the products for the farmer
    const products = await AddProduct.find({ farmerEmail }); 
    res.status(200).json(products);  // Return the products in the response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update Product Route
app.put("/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, quantity, price, date } = req.body;

  try {
    const updatedProduct = await AddProduct.findByIdAndUpdate(
      id,
      { productName, quantity, price, date },
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// Delete Product Route
app.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await AddProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});


// Farmer's Profile and Personnal Details route

// Save or update personal details
app.post('/personal-details', async (req, res) => {
  const { email, fullName, userName, address, phoneNumber, citizenshipNumber, profileImage } = req.body;

  // Validate required fields
  if (!email || !fullName || !userName || !address || !phoneNumber || !citizenshipNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const personalDetails = await PersonalDetails.findOneAndUpdate(
      { email }, // Find by email
      { fullName, userName, address, phoneNumber, citizenshipNumber, profileImage }, // Update or create with these fields
      { upsert: true, new: true } // Insert new if not found
    );

    res.status(200).json({
      message: 'Personal details saved successfully.',
      data: personalDetails,
    });
  } catch (error) {
    console.error('Error saving personal details:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Get personal details by email
app.get('/personal-details/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const personalDetails = await PersonalDetails.findOne({ email });

    if (!personalDetails) {
      return res.status(404).json({ message: 'Personal details not found.' });
    }

    res.status(200).json({ data: personalDetails });
  } catch (error) {
    console.error('Error fetching personal details:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});






// Buyers Signup Route

app.post('/bsignup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    try {
        const existingUser = await BuyersLogin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new BuyersLogin({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Buyer account created successfully' });
    } catch (error) {
        console.error('BSignup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Buyers Login Route


app.post('/blogin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!BuyersLogin) {
        console.error('BuyersLogin model is not initialized');
        return res.status(500).json({ message: 'Server error' });
      }
  
      const user = await BuyersLogin.findOne({ email });
  
      if (!user) {
        console.error(`User not found for email: ${email}`);
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.error('Password mismatch for email:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
});


// Buyer's Personal Details Backend

app.post('/bpersonal-details', async (req, res) => {
  const { email, fullName, userName, address, phoneNumber, citizenshipNumber, profileImage } = req.body;

  // Validate required fields
  if (!email || !fullName || !userName || !address || !phoneNumber || !citizenshipNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const personalDetails = await BPersonalDetails.findOneAndUpdate(
      { email }, // Find by email
      { fullName, userName, address, phoneNumber, citizenshipNumber, profileImage }, // Update or create with these fields
      { upsert: true, new: true } // Insert new if not found
    );

    res.status(200).json({
      message: 'Personal details saved successfully.',
      data: personalDetails,
    });
  } catch (error) {
    console.error('Error saving personal details:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Get personal details by email
app.get('/bpersonal-details/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const personalDetails = await BPersonalDetails.findOne({ email });

    if (!personalDetails) {
      return res.status(404).json({ message: 'Personal details not found.' });
    }

    res.status(200).json({ data: personalDetails });
  } catch (error) {
    console.error('Error fetching personal details:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});



// Farmers-Buyer's Connection



// Fetch all available products (for buyers)
app.get('/available-products', async (req, res) => {
  try {
      const farmersWithDetails = await PersonalDetails.find({}, 'email');
      const farmerEmails = farmersWithDetails.map((farmer) => farmer.email);

      const products = await AddProduct.find({
          quantity: { $gt: 0 },
          farmerEmail: { $in: farmerEmails },
      });
      res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching available products:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

async function verifyBuyerDetails(req, res, next) {
  const { buyerEmail } = req.body;
  const buyerDetails = await BPersonalDetails.findOne({ email: buyerEmail });

  if (!buyerDetails) {
      return res.status(403).json({ message: 'Save personal details to perform this action.' });
  }
  next();
}




app.post('/purchase-request', verifyBuyerDetails, async (req, res) => {
  const { buyerEmail, farmerEmail, productId, quantity } = req.body;

  try {
      const product = await AddProduct.findById(productId);

      if (!product) {
          return res.status(400).json({ message: 'Product not found' });
      }

      if (product.quantity < quantity) {
          return res.status(400).json({ message: 'Not enough stock available' });
      }

      const newRequest = new PurchaseRequest({
          buyerEmail,
          farmerEmail,
          productId,
          quantity,
      });

      await newRequest.save();

      product.quantity -= quantity;
      await product.save();

      // Notify the farmer
      const farmerNotification = {
          farmerEmail,
          message: `New purchase request from ${buyerEmail} for ${quantity} of ${product.productName}`,
      };
      // Save farmerNotification to the database or any notification system.

      res.status(201).json({ message: 'Purchase request sent successfully' });
  } catch (error) {
      console.error('Error sending purchase request:', error);
      res.status(500).json({ message: 'Server error' });
  }
});






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
