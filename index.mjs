import express, { json } from "express";
import jwt from "jsonwebtoken";

import cors from "cors";
const app = express();
const port = 5000;

app.use(json());
app.use(cors());

const { sign, verify } = jwt;


// Dummy user for validation
const dummyUser = {
  username: "rahul",
  password: "123", 
};

// Secret key for JWT (store this securely)
const JWT_SECRET = "your_jwt_secret_key";


app.get("/", async(req, res)=>{
  res.send("Hi this is test server.")
})

// Route for validating user login and sending JWT token
app.post("/api/Login/IsValidUserWithJWTToken", async (req, res) => {
  const { UserName, password } = req.body; 

  if (UserName === dummyUser.username) {
    const isPasswordValid = await password == dummyUser.password;
    
    if (isPasswordValid) {
      // Create a JWT token
      const token = sign(
        { username: UserName }, 
        JWT_SECRET,             
        { expiresIn: "5h" }     
      );

      res.json({
        message: "Login successful",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } else {
    res.status(401).json({ message: "Invalid username" });
  }
});

// Example protected route (requiring JWT)
app.get("/api/GatePass/GetUserAccessMenus", (req, res) => {
  // Get token from authorization header (typically "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verify the JWT token
  verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // If the token is valid, proceed with your logic
    const data = {
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      teams: [
        {
          name: "Naturub",
          plan: "Accessories Bangladesh",
        },
        {
          name: "Acme Corp.",
          logo: "AudioWaveform",
          plan: "Startup",
        },
        {
          name: "Evil Corp.",
          logo: "Command",
          plan: "Free",
        },
      ],
      navMain: [
        {
          title: "Playground",
          url: "#",
          icon: "SquareTerminal",
          isActive: true,
          items: [
            {
              title: "History",
              url: "#",
            },
            {
              title: "Starred",
              url: "#",
            },
            {
              title: "Settings",
              url: "#",
            },
          ],
        },
        // More nav items here...
      ],
      projects: [
        {
          name: "Design Engineering",
          url: "#",
          icon: "Frame",
        },
        {
          name: "Sales & Marketing",
          url: "#",
          icon: "PieChart",
        },
        {
          name: "Travel",
          url: "#",
          icon: "Map",
        },
      ],
    };

    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
