const settings = {
  "name": "smart-buildings-theme",
  "state": {
    "frontity": {
      "url": "https://smart-buildings-theme-shaunguimond.vercel.app",
      "title": "Smart-Buildings.io",
      "description": "Build a new kind of Decentralized Building"
    }
  },
  "packages": [
    {
      "name": "@frontity/google-analytics",
      "state": {
        "googleAnalytics": {
          "trackingId": "G-0WRXPPH9XB",
        },
      },
    },
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Services",
              "/services/"
            ],
            [
              "Contact",
              "/contact/"
            ],
            [
              "Book a Meeting",
              "https://outlook.office365.com/owa/calendar/smartbuildingsio@smart-buildings.io/bookings/"
            ]
          ],
          "featured": {
            "showOnList": true,
            "showOnPost": true
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://smart-buildings.parleedigital.ca",
          "homepage": "/home",
          "postsPage": "/blog"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@aamodtgroup/frontity-contact-form-7"
  ]
};

export default settings;
