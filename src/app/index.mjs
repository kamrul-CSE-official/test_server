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

app.get("/", async (req, res) => {
  res.send("Bismillah, Hi server is runing....🏃‍♀️‍➡️");
});

// Route for validating user login and sending JWT token
app.post("/api/Login/IsValidUserWithJWTToken", async (req, res) => {
  const { UserName, Password } = req.body;

  if (UserName === dummyUser.username) {
    const isPasswordValid = (await Password) == dummyUser.password;

    if (isPasswordValid) {
      // Create a JWT token
      const token = sign({ username: UserName }, JWT_SECRET, {
        expiresIn: "5h",
      });

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
app.post("/api/GatePass/GetUserAccessMenus", (req, res) => {
  const { EmpId, Type } = req.body;

  // Fake sidebar data
  const sidebar = [
    // Main menu items
    { MenuID: 1, MainManuID: 0, MenuName: "Dashboard", MenuType: "dashboard" },
    { MenuID: 2, MainManuID: 0, MenuName: "Profile", MenuType: "profile" },
    { MenuID: 3, MainManuID: 0, MenuName: "Settings", MenuType: "settings" },

    // Sub-menu items for "Dashboard"
    { MenuID: 4, MainManuID: 1, MenuName: "Analytics", MenuType: "analytics" },
    { MenuID: 5, MainManuID: 1, MenuName: "Reports", MenuType: "reports" },

    // Sub-menu items for "Profile"
    {
      MenuID: 6,
      MainManuID: 2,
      MenuName: "Edit Profile",
      MenuType: "edit-profile",
    },
    { MenuID: 7, MainManuID: 2, MenuName: "Privacy", MenuType: "privacy" },

    // Sub-menu items for "Settings"
    {
      MenuID: 8,
      MainManuID: 3,
      MenuName: "Account Settings",
      MenuType: "account-settings",
    },
    {
      MenuID: 9,
      MainManuID: 3,
      MenuName: "Notification Settings",
      MenuType: "notification-settings",
    },
  ];

  // Sending the fake sidebar data as the response
  res.json(sidebar);
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
