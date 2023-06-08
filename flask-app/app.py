import time
import json
import urllib


import requests
from flask_cors import CORS
import logging
import redis
from flask import Flask,request
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="https://bc201a431dd641b1844c23014c969188@o87286.ingest.sentry.io/4505235135135744",
    debug=True,
    integrations=[
        FlaskIntegration(),
    ],
    
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
  
    

    # By default the SDK will try to use the SENTRY_RELEASE
    # environment variable, or infer a git commit
    # SHA as release, however you may want to set
    # something more human-readable.
    # release="myapp@1.0.0",
)
# TODO: change this according your needs
# sentry_host = "oXXXXXX.ingest.sentry.io"
known_project_ids = ["5501941"]

app = Flask(__name__)
CORS(app)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)

@app.route('/error')
def error():
    dv = 1/0

@app.route("/bugs", methods=["POST"])
def bugs():
    try:
        envelope = request.data
        piece = envelope.split(b"\n")[0].decode("utf-8")
        header = json.loads(piece)
        dsn = urllib.parse.urlparse(header.get("dsn"))

        # if dsn.hostname != sentry_host:
        #     raise Exception(f"Invalid Sentry host: {dsn.hostname}")

        project_id = dsn.path.strip("/")
        if project_id not in known_project_ids:
            raise Exception(f"Invalid Project ID: {project_id}")

        # url = f"https://{sentry_host}/api/{project_id}/envelope/"
        url = f"http://selfhosted-relay:3000/api/{project_id}/envelope/" #might need to check if this is correct
        

        requests.post(url=url, data=envelope, headers={"Content-Type": "application/x-sentry-envelope"})
    except Exception as e:
        # handle exception in your preferred style,
        # e.g. by logging or forwarding to Sentry
        logging.exception(e)

    return {}    