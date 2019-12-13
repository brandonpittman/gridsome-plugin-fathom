# gridsome-plugin-fathom

Quickly set up Fathom Analytics in your Gridsome project.

```sh
npm install gridsome-plugin-fathom
```

```javascript
// gridsome.config.js

plugins: [
{
  use: 'gridsome-plugin-fathom',
    options: {
      siteId: 'your-site-id',
      host: 'something.com', // declare this to ensure your tracking only occurs on a single host
      debug: false // set to true for local debugging; defaults to false
    }
  }
]
```

In addition to setting up regular tracking, this plugin makes a `$trackGoal(id)` function available. Just pass the goal's ID to the function to track a goal.
