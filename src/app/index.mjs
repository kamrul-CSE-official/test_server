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
app.get("/api/GatePass/GetUserAccessMenus", (req, res) => {
  const data = [
    {
      MenuID: 1,
      MainManuID: 0,
      MenuName: "Dashboard",
      MenuType: "dashboard",
      Icon: "dashboard-icon",
    },
    {
      MenuID: 2,
      MainManuID: 0,
      MenuName: "Reports",
      MenuType: "reports",
      Icon: "reports-icon",
    },
    {
      MenuID: 3,
      MainManuID: 2,
      MenuName: "Sales Report",
      MenuType: "sales-report",
      Icon: "sales-icon",
    },
    {
      MenuID: 4,
      MainManuID: 2,
      MenuName: "Inventory Report",
      MenuType: "inventory-report",
      Icon: "inventory-icon",
    },
    {
      MenuID: 5,
      MainManuID: 0,
      MenuName: "Settings",
      MenuType: "settings",
      Icon: "settings-icon",
    },
    {
      MenuID: 6,
      MainManuID: 5,
      MenuName: "User Management",
      MenuType: "user-management",
      Icon: "user-management-icon",
    },
    {
      MenuID: 7,
      MainManuID: 5,
      MenuName: "Role Management",
      MenuType: "role-management",
      Icon: "role-management-icon",
    },
  ];

  res.json(data);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
