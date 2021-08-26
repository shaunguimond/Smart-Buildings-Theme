const settings = {
  "name": "smart-buildings-theme",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Test Frontity Blog",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
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
              "Activity",
              "/activity/"
            ],
            [
              "About",
              "/about/"
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
          "url": "https://smart-buildings.tempurl.host/",
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
