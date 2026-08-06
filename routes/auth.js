const express = require("express");
const router = express.Router();
const passport = require("passport");

// Start the GitHub OAuth flow
router.get(
  "/github",
  /*
    #swagger.start
    #swagger.tags = ['Auth']
    #swagger.summary = 'Log in with GitHub'
    #swagger.description = 'Redirects the user to GitHub to authorize this application.'
    #swagger.end
  */
  passport.authenticate("github")
);

// GitHub redirects back here after the user approves
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    res.status(200).json({
      message: "Logged in successfully.",
      user: {
        id: req.user.id,
        username: req.user.username
      }
    });
  }
);

router.get(
  "/failure",
  /*
    #swagger.start
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login failure'
    #swagger.description = 'Shown when GitHub login fails or is denied.'
    #swagger.end
  */
  (req, res) => {
    res.status(401).json({
      error: "GitHub authentication failed."
    });
  }
);

router.get(
  "/logout",
  /*
    #swagger.start
    #swagger.tags = ['Auth']
    #swagger.summary = 'Log out'
    #swagger.description = 'Ends the current authenticated session.'
    #swagger.end
  */
  (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }

      res.status(200).json({
        message: "Logged out successfully."
      });
    });
  }
);

router.get(
  "/status",
  /*
    #swagger.start
    #swagger.tags = ['Auth']
    #swagger.summary = 'Check login status'
    #swagger.description = 'Returns whether the current session is authenticated.'
    #swagger.end
  */
  (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return res.status(200).json({
        authenticated: true,
        user: {
          id: req.user.id,
          username: req.user.username
        }
      });
    }

    res.status(200).json({
      authenticated: false
    });
  }
);

module.exports = router;