## Onboarding Sandbox
---

### Setup
---
1. Download [docker desktop](https://docs.docker.com/desktop/install/mac-install/) and open once downloaded. This will start the docker engine & cli commands should be available from your terminal.

2. Install the [sentry-cli](https://docs.sentry.io/product/cli/installation/#automatic-installation). Test this out:
```
export  SENTRY_DSN = <MY_PROJECT)DSN>

sentry-cli send-event -m "test-event"

```
Congrats! You've sent your first event using the cli. This can come in handy for quick debugging.

2. Fork your own copy of the repo.

3. run  `docker-compose up --build`

4. Navigate to `localhost:4000` to confirm successful. You can simulate an error by clicking on the hyperlink labeled `unknown`.

### Exploration
---
These questions will help you touch many parts of the Sentry ecosystem from sdk configuration to other tools.

1. Why are my exceptions not being sent to Sentry? Start in `index.js` specifically `Sentry.init`.  Did we get this working? Is the browser console helpful? Check to see if the error appears in project [dustin-onboarding-react](https://testorg-az.sentry.io/issues/?project=5501941&referrer=sidebar&statsPeriod=90d).
2. What is the pathway of my error event before reaching Sentry? Start with the frontend codebase. The `docker-compose` file can also help understanding the services involved.
3. Let's set some [initial scope](https://docs.sentry.io/platforms/javascript/configuration/options/?#initial-scope). We want't some additional user information or tags on our error events (you decide!).
5. I want to start monitoring the performance of pageloads for my react-app. How can I enable transactions? How can I verify if they are being sent?
6. What is [relay](https://docs.sentry.io/product/relay/)? Where is it being used in this example? Which mode is it running in? What conveniences is it providing us? Relay config file can be found in the `./config` directory.
8. Let's connect traces between out react-app and our python app. Add another hyperlink that makes a network request to the `/error` endpoint in our flask-app.
9. Let's enable some elements in our replay so they are visible. How can we do this?
10. What's up with sourcemaps? Can we use the cli to upload these?

